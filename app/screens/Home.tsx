import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEntries, API_URL } from '../context/EntriesContext';
import EntryList from '../components/EntryList';
import axios from 'axios';
import JournalEntry from '../components/JournalEntry';
import moment from 'moment';

// const UpdateModal 
const Entry = ({ item }) => (
  <View style={styles.item}>
    <View style={{flexDirection:"row"}}>
      <View style={{flex:5}}>
        <Text style={{justifyContent: "flex-start", fontWeight:"900"}}>{moment(item.created_at).format("LLLL")}</Text>
      </View>
      <View style={{flex:1}}>
        <Pressable style={styles.update_btn}>
          <Text style={{color: "#fff"}}>Update</Text>
        </Pressable>
      </View>
    </View>
    
    <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 10
    }}
  />
    <Text>{item.entry.substring(0, 10)} ...</Text>
  </View>
);

const Home = () => {
  const [entries, setEntries] = useState({});
  const [categories, setCategories] = useState({});
  const { onAddEntry, onLoadEntries, onDeleteEntry, onUpdateEntry } = useEntries();
  
  // console.log(entries);
  useEffect(() => {
    const getEntries = async () => {
      const result = await axios.get(API_URL);
      if (result.status == 200) {
        setEntries(result.data.entries);
        setCategories(result.data.categories)
      }
    }
    getEntries();
  }, []);

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
    margin: 1,
    gap: 5,
    borderWidth:0.5,
    borderRadius: 5,
  },
  update_btn: {
      borderColor: "#000",
      backgroundColor: "#000",
      borderWidth: 1,
      padding:2.5,
      borderRadius: 4,
      alignItems: "center",
      justifyContent:"flex-end"
    },
})
export default Home;