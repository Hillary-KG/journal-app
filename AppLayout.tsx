import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from './app/context/AuthContext';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';


const Stack = createNativeStackNavigator();

export default function Layout() {
    const { authState, onLogout } = useAuth()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {authState?.authenticated ? (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerRight: () => <Pressable onPress={onLogout}><Text>Sign Out</Text></Pressable>                            
                        }}></Stack.Screen>
                ) : (
                    <Stack.Screen name="Login" component={Login}></Stack.Screen>
                )}
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})