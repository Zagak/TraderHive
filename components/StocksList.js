import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { csvParse } from 'd3-dsv'
import { getAllStocks } from '../util/http';
import { getStock } from '../util/http';
import { FlatList } from 'react-native';
import StockShow from './StockShow';

const API_KEY = '2HAZ31MOAL42TEVB';
const API_BASE_URL = 'https://www.alphavantage.co';

const StocksList = () => {
    const [stocks, setStocks] = useState([]);
    const [renderedStocks, setRenderedStocks] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchNumber, setFetchNumber] = useState(0);
    const [number, setNumber] = useState(0);


    useEffect(() => {
        async function getAllStocks() {
            try {

                const response = await fetch(`${API_BASE_URL}/query?function=LISTING_STATUS&apikey=${API_KEY}`);
                const csvData = await response.text();
                //console.log(csvData);
                const parsedData = csvParse(csvData);
                setStocks(parsedData);
            } catch (error) {
                console.log('Error:', error);
            }
        }

        getAllStocks();




    }, []);



    async function renderSymbol() {
        for (let i = number; i <= number + 0; i++) {//am pus 0 in loc de 2 
            const response = await getStock(stocks[i].symbol, stocks[i].name);
            if(response!==undefined)setRenderedStocks(prevState => [...prevState, response]);
            //console.log(response);
        }
        setNumber(prevNumber => prevNumber + 3);

    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFetchNumber(prevFetchNumber => prevFetchNumber + 1);
        }, 90000); // Set interval to 90 seconds

        renderSymbol(); // Call renderSymbol() once when the component mounts

        return () => clearInterval(intervalId);
    }, [fetchNumber, stocks]); // Call the effect whenever fetchNumber changes




    return (
        <View>
            <FlatList
                data={renderedStocks}
                renderItem={({ item }) => (
                    item !== undefined && <StockShow {...item} />
                )}
                keyExtractor={(item) => {
                    if (item !== undefined) {
                        return item.symbol;
                    }
                }}
                onEndReached={() => {
                    // Load the next page of stocks when the user reaches the end of the list
                    setPageNumber(prevPage => prevPage + 1);
                }}
                onEndReachedThreshold={1} // Load the next page of stocks when the user is halfway through the list
            />
        </View>
    );
};



export default StocksList;
