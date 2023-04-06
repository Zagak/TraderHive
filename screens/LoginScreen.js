import { useContext, useState } from "react";
import { Alert } from "react-native";
import { View,Text,StyleSheet,Image } from "react-native";
import Button from "../components/Button";


//import { GoogleSignin,GoogleSigninButton } from 'react-native-google-signin';
//import * as Facebook from 'expo-facebook';




import Input from "../components/Input";
import Loading from "../components/Loading";
import { Colors } from "../constants/Colors";
import { AuthContext } from "../store/auth-context";
import { loginUser,createUser,createUserOAuth } from "../util/auth";

import {LinearGradient} from 'expo-linear-gradient';





function LoginScreen({navigation}){
    const [isAuthentificating,setIsAuthentificating] = useState(false);

    const [mail,setMail]=useState('');
    const [password,setPassword]=useState('');

    const authCtx=useContext(AuthContext);

    async function LoginHandler(){
        setIsAuthentificating(true);
        try{
            const token=await loginUser(mail,password);
            console.log(token);
            authCtx.authenticate(token.idToken);
        }catch(error){
            Alert.alert('Incorrect credentials','Please veerify that your email and password are correct.');
            
        }
        setIsAuthentificating(false);
    }

    // async function FacebookSignup(){
    //     try {
    //         await Facebook.initializeAsync({
    //           appId: '1356490281559400',
    //         });
    //         const { type, token, expirationDate, permissions, declinedPermissions } =
    //           await Facebook.logInWithReadPermissionsAsync({
    //             permissions: ['public_profile','email'],
    //           });
    //         if (type === 'success') {
    //           // Get the user's name using Facebook's Graph API
              
    //           const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

    //          // console.log(response.json().toString());
             
    //           const SignToken=await createUserOAuth();


    //           Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //         } else {
    //           // type === 'cancel'
    //         }
    //       } catch ({ message }) {
    //         alert(`Facebook Login Error: ${message}`);
    //       }
    // }

    if(isAuthentificating){
        return <Loading message={"We are logging you in ..."}/>
    }

    return(
    <LinearGradient colors={Colors.colors} style={styles.container}>
        <Input label={"E-mail"} imageSource={require('../images/richMan.png')} color={{backgroundColor:Colors.font1}} keyboardType="email-address" onAuthenticate={setMail}/>
        <Input label={"Password"} imageSource={require('../images/seif.jpg')} color={{backgroundColor:Colors.font1}} secure={true} onAuthenticate={setPassword}/>
        <Button onPress={LoginHandler}>LogIn</Button>
        <View style={styles.line} />
        <View style={styles.textContainer}>
            <Text>Signup instead with ... </Text>
        </View>
        <Button style={{width:'70%'}} onPress={()=> navigation.navigate("Signup")}>Email and Password</Button>
        <Button style={{width:'70%'}} >           {/*  onPress={FacebookSignup} */}
            <Image style={{ width: 18, height:18 }} source={require('../images/fb.png')}/>
            ㅤSing up with FACEBOOK
        </Button>
    </LinearGradient>
    );
}

export default LoginScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.font2,
        paddingTop:28,
    },line:{
        borderBottomColor: 'black',
        borderBottomWidth: 1 ,
        marginHorizontal:28,
        marginTop:80,
    },
    textContainer:{
        alignSelf:'center',
        marginTop:24,
    }
});