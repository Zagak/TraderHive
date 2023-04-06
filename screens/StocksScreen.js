import { Colors } from "../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { getStock } from "../util/http";
import StockShow from "../components/StockShow";
import { useState } from "react";
import { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import StocksList from "../components/StocksList";
import Input from "../components/Input";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

function StocksScreen() {
    const [searchedStock, setSearchedStock] = useState(undefined);

    //console.log(searchedStock);

    return (
        <LinearGradient colors={Colors.colors} style={styles.container}>
            <SearchBar label={"Search stocks..."} sendTheStock={setSearchedStock} />
            {searchedStock === undefined &&<StocksList />}
            <View>
                {searchedStock !== undefined&&isNaN(searchedStock.changePercent)&&Alert.alert("Not a valid stock!","Please enter a valid stock symbol")}
                {searchedStock !== undefined && !isNaN(searchedStock.changePercent) &&
                    <FlatList
                    data={[searchedStock]}
                    renderItem={({ item }) => (
                        <StockShow name={''} price={item.price} changePercent={item.changePercent} symbol={item.symbol} />
                    )}
                    keyExtractor={(item) => item.symbol}/>
                    
                }
            </View>
        </LinearGradient>
    );
}

export default StocksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        backgroundColor: Colors.font1,
        borderRadius: 8,
        marginHorizontal: 8
    },
    input: {
        backgroundColor: 'white',
        marginLeft: '10%',
        marginRight: '50%'
    },
    search: {
        color: 'black',
    }
});

