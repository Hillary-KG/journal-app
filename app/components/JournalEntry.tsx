import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function JournalEntry({ entry, updateEntry, deleteEntry }) {
  return (
    <View>
      <Text>Entry: {entry.entry}.substring(0, 20)</Text>
      <Text>Date Created: {entry.created_at}</Text>
      <Text>Date Updated: {entry.updated_at}</Text>
      <View>
        {/* <Text>Category</Text><Text>{entry.category.name}</Text> */}
      </View>
      <Text>{entry.entry}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})