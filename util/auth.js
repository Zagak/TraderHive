import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY= 'AIzaSyAlSBYLH1ZNpn1IQiL-Pj3zqr46E3-vCY0';

async function authenticate(mode,mail,password){
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url,{
        email:mail,
        password:password,
        returnSecureToken:true
    });

    const credentials = response.data;
    AsyncStorage.setItem('id',credentials.localId);
    return credentials;

}

export function createUser(mail,password){
    return authenticate('signUp',mail,password);
}

export function loginUser(mail,password){
    return authenticate('signInWithPassword',mail,password);
}


async function authenticateOAuth(mode){
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url,{
        id_token:'1356490281559400',
        providerId:'facebook.com',
        requestUri:'http://localhost',
        returnIdpCredential:true,
        returnSecureToken:true
    });

    const token = response.data.idToken;

    return token;

}

export function createUserOAuth(){
    return authenticateOAuth('signInWithIdp');
}