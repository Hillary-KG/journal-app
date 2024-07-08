import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEntries, API_URL } from '../context/EntriesContext';
import EntryList from '../components/EntryList';
import axios from 'axios';
import JournalEntry from '../components/JournalEntry';

const Entry = ({ item }) => (
  <View style={styles.item}>
    <Text style={{fontWeight:"700"}}>Entry: {item.entry.substring(0, 10)} ...</Text>
    <Text>Date Created: {item.created_at}</Text>
    {/* <Text>Date Updated: {item.updated_at}</Text> */}
  </View>
);

const Home = () => {
  const [entries, setEntries] = useState({});
  const [categories, setCategories] = useState({});
  const { onAddEntry, onLoadEntries, onDeleteEntry, onUpdateEntry } = useEntries();

  useEffect(() => {
    const getEntries = async () => {
      const result = await axios.get(API_URL);
      if (result.status == 200) {
        console.log(result.data);
        setEntries(result.data.data);
      }
    }
    getEntries();
  }, [])

  return (
    <View style={styles.cotainer}>
      <FlatList
      data={entries}
      keyExtractor={item => item.id}
      renderItem={Entry}
      />
    </View>
    
  )
}
const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    // backgroundColor: "#a3a381",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    margin: 5,
    alignContent: "flex-start",
    // backgroundColor: "#171701",
    // color: "#fff",
    borderWidth:2,
    borderRadius: 5,
  }
})
export default Home;