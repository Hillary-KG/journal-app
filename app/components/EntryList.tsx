import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEntries } from '../context/EntriesContext';
import JournalEntry from './JournalEntry';

export default function EntryList() {
    const [entries, setEntries] = useState([]);
    const { addEntry, deleteEntry, updateEntry } = useEntries();
    return (
        <FlatList
            data={entries}
            renderItem={({ item }) => <JournalEntry
                // key={entry.id}
                entry={item.entry}
                deleteEntry={deleteEntry}
                updateEntry={undefined} />
            }
        />
    )
}

const styles = StyleSheet.create({})