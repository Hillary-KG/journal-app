import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, email: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const ACCESS_TOKEN = "access_token";
export const API_URL = "http://192.168.1.21:5000/api/auth"
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });
    useEffect(() => {
        const loadToken = async () => {
            const token = await secureStore.getItemAsync(ACCESS_TOKEN);
            if (token) {
                setAuthState({
                    token: token,
                    authenticated: true
                });
                // attach toke to auth header of every request
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }
        loadToken();
    }, [])

    const register = async (username: string, email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/register`, { username, email, password });
        } catch (error) {
            return { error: true, msg: (error as any).response.data.error };
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, { username, password });
            console.log(result.data.access_token);
            
            setAuthState({
                token: result.data.access_token,
                authenticated: true
            });
            console.log(authState);
            // attach toke to auth header of every request
            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.access_token}`;
            // store the token in local storage
            await secureStore.setItemAsync(ACCESS_TOKEN, result.data.access_token);

            return result;
        } catch (error) {
            console.log(error)
            return { error: true, msg: (error as any).response.data.error };
        }
    };

    const logout = async () => {
        // delete token from storage
        await secureStore.deleteItemAsync(ACCESS_TOKEN);
        // update auth header
        axios.defaults.headers.common["Authorization"] = "";
        setAuthState({
            token: null,
            authenticated: false
        });
    };
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}