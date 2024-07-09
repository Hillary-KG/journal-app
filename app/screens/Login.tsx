import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { authState, onLogin } = useAuth();
    
    const login = async () => {
        const result = await onLogin!(username, password);
        if (result && result.error ) {
            alert(result.msg);
        }
        console.log(authState!)
    }
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'asset:/favicon.png'}} style={styles.image}></Image>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Username' onChangeText={(text: string) => setUsername(text)}/>
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)}/>
          <View style={styles.buttons}>
            <Pressable onPress={login} style={styles.pressable}>
            <Text style={styles.innerText}>Sign In</Text>
          </Pressable>
          <Text style={{color:"#746F", margin: 6}}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")} style={{borderColor: "#000", borderWidth: 1, padding: 5, borderRadius: 4}}>
            <Text>Sign Up</Text>
          </Pressable>
          </View>
          
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: "50%",
        height: "50%",
        resizeMode: "contain"
    },

      form: {
          gap: 15,
          width: "60%"
      },
      input:{
          height: 45,
          borderWidth: 1,
          borderRadius: 4,
          padding: 10,
          backgroundColor: "#fffff"
      },
      container: {
          alignItems: "center",
          width: "100%"
      },
      pressable: {
        backgroundColor: "#000",
        borderColor: "#000",
        // margin: 3,
        padding:6,
        borderRadius: 4,
        alignItems: "center",
        width: "50%"
      },
    buttons:{
      alignItems: "center"
    },
    innerText:{
      color: "#fff"
    }
});
export default Login;   