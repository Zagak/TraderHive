import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Colors } from "../constants/Colors";
import Button from "./Button";
import { getStock } from "../util/http";
import { useState } from "react";
import StockShow from "./StockShow";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ label,sendTheStock }) {
    const [enteredStock,setEnteredStock] = useState('');
    const [theStock,setTheStock] = useState({});


    async function getTheStock(){
        const stock = await getStock(enteredStock);
        sendTheStock(stock);
    }

    return (
        <View style={styles.inputContainer}>
            <View style={styles.input}>
                <Image source={require('../images/magnifier.png')} style={styles.image} />
                <TextInput placeholder={label} style={styles.search} onChangeText={(setStock)=>{setEnteredStock(setStock)}}/>
            </View>
            <Button style={styles.button} onPress={getTheStock}>
                <FontAwesomeIcon icon={faHandHoldingDollar} color={'white'} />
            </Button>
        </View>

    );
}

export default SearchBar;

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.font1,
        borderRadius: 24,
        marginHorizontal: 8,
        marginTop: 24,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    input: {
        backgroundColor: 'white',
        marginLeft: '10%',
        marginRight: '8%',
        borderRadius: 12,
        paddingRight: '30%'
    },
    search: {
        color: 'black',
        marginLeft: 36
    },
    image: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 2,
        top: 1,
        borderRadius: 8,  
    },
    button: {
        marginTop: 0,
        width: '10%',
        paddingHorizontal: 0,
        paddingVertical: 5,
        backgroundColor: Colors.font1,
        borderWidth: 0,
        
        
    },
    buttonContainer: {
        flex: 1,
    }
});

