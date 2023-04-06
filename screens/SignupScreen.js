import { useState } from "react";
import { View,Text,StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/Input";
import { Colors } from "../constants/Colors";
import { createUser } from "../util/auth";
import Loading from "../components/Loading";
import { storeUser } from "../util/http";

function SignupScreen({navigation}){
    const [mail,setMail]=useState('');
    const [password,setPassword] = useState('');
    const [adress,setAdress] = useState('');
    const [phone,setPhone] = useState('');
    const [birth,setBirth] = useState('');
    const [name,setName] = useState('');

    const [isAuthentificating,setIsAuthentificating] = useState(false);


    async function HandleSignup(){
        //setIsAuthentificating(true);
       
        const convertBirth=new Date(birth);

        const PasswordValid = password.length>=6;
        const addressValid = adress.length>5;
        const phoneValid = !isNaN(phone) && phone.length===10;
        const birthValid = convertBirth.toString()!=='Invalid Date';
        const nameValid=name.length>=3;

        console.log(addressValid+" "+phoneValid+" "+birthValid+""+name+" "+"passwordValid: ",PasswordValid);

    try{
        if(addressValid===true&&phoneValid===true&&birthValid===true&&PasswordValid===true&&nameValid===true){
            
            const credentials = await createUser(mail,password);
            
            //creaza alt user ca sa i se sesteze id-ul
            //AsyncStorage.setItem('id',credentials.localId);
            
            await storeUser({id:credentials.localId,email:credentials.email,adress:adress,phone:phone,birth:convertBirth,name:name});
          
            navigation.goBack();
        }else{
            Alert.alert("Something went wrong","Verify your credentials");
        }
    }catch(error){
        console.log(error.message);
        Alert.alert("Something went wrong","Try again");
        setIsAuthentificating(false);
    }
    
    }

    if(isAuthentificating){
        return <Loading message={"Account is being created ..."}/>;
    }

    return(
    <View style={styles.container}>

        <Input label={"Name"} imageSource={require('../images/richMan.png')} color={{backgroundColor:Colors.font1}}  onAuthenticate={setName}/>
        <Input label={"E-mail"} imageSource={require('../images/mailu.png')} color={{backgroundColor:Colors.font1}} keyboardType="email-address" type="mail" onAuthenticate={setMail}/>
        <Input label={"Password"} imageSource={require('../images/seif.jpg')} color={{backgroundColor:Colors.font1}} secure={true} onAuthenticate={setPassword}/>
        <Input label={"Adress"} imageSource={require('../images/adress.jpg')} color={{backgroundColor:Colors.font1}} onAuthenticate={setAdress}/>
        <Input label={"Phone"} imageSource={require('../images/phone.png')} color={{backgroundColor:Colors.font1}}  onAuthenticate={setPhone}/>
        <Input label={"BirthDate(YYYY-MM-DD)"} imageSource={require('../images/birthday.png')} color={{backgroundColor:Colors.font1}}  onAuthenticate={setBirth}/>
       
        <Button onPress={HandleSignup}>SignUp</Button>
      
        
    </View>
    
    );
}

export default SignupScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.font2,
        paddingTop:86,
    },
    textContainer:{
        alignSelf:'center',
        marginTop:24,
    }
});