import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { getStockInfo } from "../util/http";
import { useEffect, useState } from "react";
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts';
import { Line, Defs, Stop } from "react-native-svg";
import MyChart from "./MyChart";
import MultiLineText from "./MultiLineText";
import Button from "./Button";
import Input from "./Input";
import { getStock } from "../util/http";
import { buyStock } from "../util/http";

function StockInfo({ route }) {
    const [stockPrice, setStockPrice] = useState(1);
    const [stockQuantity,setStockQuantity] = useState(1);
    const [convertedStock, setConvertedStock] = useState(0);
    const [dates, setDates] = useState([]);
    const [labelss, setLabelss] = useState([]);

    const symbol=route.params;
   
    useEffect(() => {
        setConvertedStock(stockQuantity*stockPrice);
    }, [stockQuantity]);


    useEffect(() => {
        async function getInfo() {
            const result = await getStockInfo(route.params);
            return result.reverse();
        }

        getInfo().then((result) => {
            setDates([]);
            setLabelss([]);
            result.map((element) => {
                setDates((prevDates) => [...prevDates, element.price]);
                setLabelss((prevLabelss) => [...prevLabelss, element.date.toISOString().substring(5, 8) + element.date.toISOString().substring(2, 4) + "|"]);

            });


            console.log(dates);
            console.log(labelss);
        });
    }, [route]);

    useEffect(() => {
        async function getPrice() {
            const result = await getStock(route.params);
            setStockPrice(result.price);
        }

        getPrice();
    }, []);

    async function handleBuy(){
        await buyStock(symbol,stockQuantity,convertedStock);
    }

    return (
        <LinearGradient colors={Colors.colors} style={styles.container}>
            <View style={styles.chartContainer}>
                <MyChart data={dates} labels={labelss} />
            </View>
            <Input textChange={setStockQuantity} />
            <Text style={styles.priceShow}>That is : {convertedStock.toFixed(2)}</Text>
            <View style={styles.buttons}>
                <Button style={{ marginHorizontal: 15 }} onPress={handleBuy}>Buy</Button>
                <Button style={{ marginHorizontal: 15 }}>Sell</Button>
            </View>
        </LinearGradient>
    );
}


export default StockInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        width: '103%'
    },
    chart: {
        height: 200,
        width: '90%',
        alignSelf: 'center',

    },
    chartContainer: {
        //flex:1,
        alignSelf: 'center',
        width: '103%',
        marginTop: '20%'
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '15%'
    },
    priceShow: {
        marginTop: '10%',
        alignSelf: 'center',
    }

});