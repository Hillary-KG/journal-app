import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from './app/context/AuthContext';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import AddEntry from './app/screens/AddEntry';


const Stack = createNativeStackNavigator();

export default function Layout() {
    const { authState, onLogout } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' >
                {authState?.authenticated ? (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={({ navigation }) => ({
                            // headerShown: false,
                            headerTitleAlign: "center",
                            headerRight: () => <Pressable onPress={onLogout} style={styles.signout_button}><Text>Sign Out</Text></Pressable>, 
                            headerLeft: () => <Pressable onPress={() => navigation.navigate(AddEntry)} style={styles.add_button}><Text style={{ color: "#fff", fontWeight: "800"}}>Add New</Text></Pressable>  
                        })}
                        />
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ title: "Sign In"}}></Stack.Screen>
                )}
                <Stack.Screen name="Register" component={Register} options={{ title: "Sign Up"}}></Stack.Screen>
                <Stack.Screen name="AddEntry" component={AddEntry} options={{ title: "Add Journal Entry"}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({

    signout_button: {
        borderColor: "#000",
        borderWidth: 1,
        padding:4,
        borderRadius: 4,
        alignItems: "center",
      },
    add_button: {
        borderColor: "#000",
        backgroundColor: "#07871a",
        // borderWidth: 1,
        padding:6,
        borderRadius: 4,
        alignItems: "center",
      },
})