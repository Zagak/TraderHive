import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAlSBYLH1ZNpn1IQiL-Pj3zqr46E3-vCY0",
    authDomain: "licentaase-520ca.firebaseapp.com",
    databaseURL: "https://licentaase-520ca-default-rtdb.firebaseio.com",
    projectId: "licentaase-520ca",
    storageBucket: "licentaase-520ca.appspot.com",
    messagingSenderId: "494437623748",
    appId: "1356490281559400"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

