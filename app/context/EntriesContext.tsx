import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as secureStore from "expo-secure-store";

interface EntryProps {
    onLoadEntries?: (id: number | null) => Promise<any>;
    onGetEntry?: (id: number) => Promise<any>;
    onAddEntry?: () => (entry: string) => Promise<any>;
    onDeleteEntry?: () => (id: number) => Promise<any>;
    onUpdateEntry?: () => (id: number, entry: string | null, category_id: number | null) => Promise<any>;
}

export const API_URL = "http://192.168.1.21:5000/api/journal-entries"
const JournalEntryContext = createContext<EntryProps>({});

export const useEntries = () => {
    return useContext(JournalEntryContext);
};

export const JournalEntriesProvider = ({ children }: any) => {
    const [entries, setEntries ] = useState([]);

    useEffect(()=>{
        const loadEntries = async () => {
            try {
                const result =  await axios.get(`${process.env.API_URL}/journal-entries`);
                if (result.status == 200) {
                    setEntries(result.data.data);
                }
            }
            catch (error) {
                alert("Could not load journal entries");
            }
        }
        loadEntries()
    }, []);

    const getEntries = async () => {
        try {
            const result =  await axios.get(API_URL);
            if (result.status == 200) {
                console.log(result.data.data);
                return result.data.data;
            }
        }
        catch (error) {
            return {error: true, msg: (error as any).response.data.error}
        }
    }
    const addEntry = async () => {

    }
    const updateEntry = async () => {

    }
    const deleteEntry = async () => {

    }
    const value  = {
        onLoadEntries: getEntries,
        onAddEntry: addEntry,
        onDeleteEntry: deleteEntry,
        onUpdateEntry: updateEntry
    }
    return <JournalEntriesProvider value={value}>{children}</JournalEntriesProvider>
}