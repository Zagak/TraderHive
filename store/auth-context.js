import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    currency:'',
    token:'',
    isAuthenticated:false,
    authenticate: (token) => {},
    logout: () => {},
    chooseCurrency:(currency) =>{}
});

function AuthContextProvider({children}){
    const [authToken,setAuthToken] = useState();
    const [currency,setCurrency] = useState();

    function chooseCurrency(currency){
        setCurrency(currency);
    }

    function authenticate(token){
        setAuthToken(token);
        AsyncStorage.setItem('token',token);
    }

    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem('databaseID');
        AsyncStorage.removeItem('token');
       
    }

    const value = {
        token:authToken,
        isAuthenticated:!!authToken,
        currency:currency,
        authenticate:authenticate,
        logout:logout,
        chooseCurrency:chooseCurrency
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;