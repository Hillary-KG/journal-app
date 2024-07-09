import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as secureStore from "expo-secure-store";

interface Entry {
    category_id: null;
    created_at: string;
    entry: string;
    id: number;
    updated_at: string;
    user_id: number
}
interface EntryProps {
    onLoadEntries?: (id: number | null) => Promise<any>;
    onGetEntry?: (id: number) => Promise<any>;
    onAddEntry?: (entry: string) => Promise<any>;
    onDeleteEntry?: (id: number) => Promise<any>;
    onUpdateEntry?: (id: number, entry: string | null, category_id: number | null) => Promise<any>;
    entries?: Array<Entry>;
}


export const API_URL = "http://192.168.100.40:5000/api/journal-entries"
const JournalEntryContext = createContext<EntryProps>({});

export const useEntries = () => {
    return useContext(JournalEntryContext);
};

export const JournalEntriesProvider = ({ children }: any) => {
    const [entries, setEntries ] = useState([]);

    useEffect(()=>{
        const loadEntries = async () => {
            try {
                const result =  await axios.get(API_URL);
                if (result.status == 200) {
                    console.log(result.data.data)
                    setEntries(result.data.data);
                }
            }
            catch (error) {
                alert("Could not load your journal entries");
            }
        }
        loadEntries()
    }, []);

    const getEntries = async () => {
        try {
            const result =  await axios.get(API_URL);
            if (result.status == 200) {
                // console.log(result.data.data);
                setEntries(result.data.data);
                return result.data.data;
            }
        }
        catch (error) {
            return {error: true, msg: (error as any).response.data.error}
        }
    }

    const addEntry = async (entry: string) => {
        try {
            const result =  await axios.post(`${API_URL}/add`, {entry});
            if (result.status == 201) {
                console.log(result.data.data);
                getEntries();
                // return result.data.data;
            }
        }
        catch (error) {
            return {error: true, msg: (error as any).response.data.error}
        }
    }

    const updateEntry = async () => {

    }

    const deleteEntry = async () => {

    }

    const value = {
        onLoadEntries: getEntries,
        onAddEntry: addEntry,
        onDeleteEntry: deleteEntry,
        onUpdateEntry: updateEntry,
        entries
    };

    return <JournalEntryContext.Provider value={value}>{children}</JournalEntryContext.Provider>;
}