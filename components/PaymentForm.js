import Input from "./Input";
import { View ,StyleSheet} from "react-native";
import React, { useState } from 'react';
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import { storeExpense } from "../util/http";


function PaymentForm() {
    const navigation = useNavigation();

    const [expense,setExpense] = useState({
        name : '',
        price: '',
        quantity:'',
        description:''
    });


    async function handleSubmit(){
        await storeExpense(expense);
        navigation.navigate("Expenses",expense);
    }

    function inputHandler(inputIdentifier,enteredValue){
        setExpense((currExpense)=>{
            return{
                ...currExpense,
                [inputIdentifier]:enteredValue
            }
        })
    }

    return (
        <LinearGradient colors={Colors.colors} style={styles.container}>
            <Input imageSource={require('../images/grocery.png')} label={"Name"} textChange={inputHandler.bind(this, 'name')}/>
            <Input imageSource={require('../images/tag.png')} label={"Price"} textChange={inputHandler.bind(this, 'price')}/>
            <Input imageSource={require('../images/quantity.png')} label={"Quantity"} textChange={inputHandler.bind(this, 'quantity')}/>
            <Input imageSource={require('../images/description.jpg')} label={"Description"} textChange={inputHandler.bind(this, 'description')}/>
            <Button onPress={handleSubmit}>Add Expense</Button>
        </LinearGradient>
    );
}

export default PaymentForm;

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:36
    }
});