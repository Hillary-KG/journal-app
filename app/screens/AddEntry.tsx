import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useEntries } from '../context/EntriesContext';

export default function AddEntry() {
    const [entry, setEntryText] = useState("");
    const { onAddEntry, entries } = useEntries();
    
    const addEntry = async () => {
        const response = await onAddEntry!(entry);
        if (response && response.error ) {
            alert(response.msg);
        }
        console.log(entries!);
    }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput 
        style={styles.input} 
        placeholder='Write journal entry' 
        onChangeText={(text: string) => setEntryText(text)}
        multiline={true}
        numberOfLines={10}

        />
          <View>
            <Pressable onPress={addEntry} style={styles.pressable}>
                <Text style={{color: "#fff"}}>Submit</Text>
          </Pressable>
          </View>
          
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    form: {
        gap: 25,
        width: "100%",
        padding: 15
    },
    input:{
        height: 200,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fffff",
        textAlignVertical: "top",
        alignContent: "flex-start"
    },
    container: {
        alignItems: "center",
        width: "100%"
    },
    pressable: {
      backgroundColor: "#a38303",
      borderColor: "#000",
      // margin: 3,
      padding:7,
      borderRadius: 4,
      alignItems: "center",
      width: "25%"
    },
})