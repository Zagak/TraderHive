import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import Input from './Input';
import CurrencyMenu from './CurrencyMenu';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { storeCard } from '../util/http';
import { getCards } from '../util/http';

function CardForm() {
    const navigation = useNavigation();
    const [currency, setCurrency] = useState('');
    const [submit,setSubmit] = useState(false);

    const [card, setCard] = useState({
        name: '',
        amount: '',
        currency: '',
    });


    function handleSubmit() {
        inputHandler('currency', currency);
        setSubmit(true);
        navigation.navigate("Cards",card);
        
    }



    function inputHandler(inputIdentifier, enteredValue) {
        setCard((currCard) => {
            return {
                ...currCard,
                [inputIdentifier]: enteredValue
            }
        })
    }


    useEffect(() => {
        if (submit===true) { 
          async function storeCardAsync() {
            try {
              await storeCard(card);
              console.log('Card stored successfully');
              setSubmit(false);
            } catch (error) {
              console.log('Error while storing card:', error);
            }
          }
          storeCardAsync();
        }
    }, [submit]);
      
      

    // useEffect(() => {
    //     console.log(card);
    // }, [card]);


    return (
        <LinearGradient colors={Colors.colors} style={styles.container}>
            <Input imageSource={require('../images/card.jpg')} label={"Card Name"} textChange={inputHandler.bind(this, 'name')} />
            <Input imageSource={require('../images/amount.png')} label={"Card available money"} textChange={inputHandler.bind(this, 'amount')} />
            <View style={styles.currency}>
                <CurrencyMenu settedCurrency={(curr)=>setCurrency(curr)} />
            </View>
            <Button onPress={handleSubmit}>Add Card</Button>
        </LinearGradient>
    );
}

export default CardForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    amountContainer: {
        flexDirection: 'row',

    },
    currency: {
        position: 'absolute',
        marginLeft: 320,
        marginTop: 200
    }
})