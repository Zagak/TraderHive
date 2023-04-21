import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';


const API_KEY = 'AIzaSyAlSBYLH1ZNpn1IQiL-Pj3zqr46E3-vCY0';
const BACKEND_URL = 'https://licentaase-520ca-default-rtdb.firebaseio.com';
//const databaseID = AsyncStorage.getItem('databaseID');

export async function getEconomisEvent() {
  const apiKey = '8f4ede045edf406ab1e8b62b6ee19976';
  const domain = 'cnbc.com';
  const url = `https://newsapi.org/v2/everything?domains=${domain}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function storeUser(userData) {
  const response = await axios.post(BACKEND_URL + '/users.json', userData);
  const id = response.data.name;
  return id;
}

export function getUser(id) {
  return getter(`users/${id}/email`);
}

export async function storeExpense(expenseData) {
  const databaseID = await AsyncStorage.getItem('databaseID');
  await axios.post(BACKEND_URL + `/users/${databaseID}/expenses.json`, expenseData);
}

export async function getExpenses() {
  const databaseID = await AsyncStorage.getItem('databaseID');
  const expenses = await axios.get(`${BACKEND_URL}/users/${databaseID}/expenses.json`);
  return expenses.data;
}

export async function storeCard(cardData) {
  const databaseID = await AsyncStorage.getItem('databaseID');
  await axios.post(BACKEND_URL + `/users/${databaseID}/cards.json`, cardData);
}

export async function getCards() {
  const databaseID = await AsyncStorage.getItem('databaseID');
  const cards = await axios.get(`${BACKEND_URL}/users/${databaseID}/cards.json`);
  return cards.data;
}

export async function getValutarCourse(base, target, amount) {
  const apiKey = "jF7UwFiyvVMDhm0qs0MpDrLOy6j8X451";
  const url = `https://api.apilayer.com/fixer/convert?to=${base}&from=${target}&amount=${amount}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = data.result;
    console.log(result)
    return result;
  } catch (error) {
    console.log('Error:', error);
  }
};

export async function getAvailableMoney() {
  console.log("intruu");
  const databaseID = await AsyncStorage.getItem('databaseID');
  const availableAmount = await axios.get(BACKEND_URL + `/users/${databaseID}/NetWorth.json`);
  const amount = availableAmount.data;

  return amount;
}

export async function getStocks() {
  const databaseID = await AsyncStorage.getItem('databaseID');
  const stocks = await axios.get(BACKEND_URL + `/users/${databaseID}/stocks.json`);
  return stocks.data;
}

export async function getStockActualValue(symbol, quantity) {
  //const databaseID = await AsyncStorage.getItem('databaseID');
  //const result=await axios.get(BACKEND_URL + `/users/${databaseID}/stocks/${symbol}.json`);
  const result = await getStock(symbol);

  const ownedStockValue = result.price * quantity;

  return ownedStockValue;
}

export async function sellStock(symbol, quantity, price) {
  const databaseID = await AsyncStorage.getItem('databaseID');
  console.log(symbol);
  const currentStock = await axios.get(BACKEND_URL + `/users/${databaseID}/stocks/${symbol}.json`);

  let currentQuantity = 0
  console.log(currentStock.data);
  if (currentStock.data !== null) currentQuantity = currentStock.data.quantity;
  const newQuantity = parseFloat(currentQuantity) - parseFloat(quantity);
  if (newQuantity < 0) return Alert.alert("You don't have the required stocks!", "Enter a number <= with the number of the specified stock that you have!");


  let currentPrice = 0
  if (currentStock.data !== null) currentPrice = currentStock.data.price;
  const newPrice = parseFloat(currentPrice) - parseFloat(price);


  const availableMoney = await getAvailableMoney();
  const remainedMoney = parseFloat(availableMoney) + parseFloat(price);

  if (remainedMoney >= 0) {
    await axios.patch(BACKEND_URL + `/users/${databaseID}/stocks/${symbol}.json`, { quantity: newQuantity, price: newPrice });
    await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: remainedMoney });
  }

}

export async function buyStock(symbol, quantity, price) {
  const databaseID = await AsyncStorage.getItem('databaseID');
  console.log(symbol);
  const currentStock = await axios.get(BACKEND_URL + `/users/${databaseID}/stocks/${symbol}.json`);

  let currentQuantity = 0
  console.log(currentStock.data);
  if (currentStock.data !== null) currentQuantity = currentStock.data.quantity;
  const newQuantity = parseFloat(quantity) + parseFloat(currentQuantity);

  let currentPrice = 0
  if (currentStock.data !== null) currentPrice = currentStock.data.price;
  const newPrice = parseFloat(price) + parseFloat(currentPrice);

  const availableMoney = await getAvailableMoney();
  const remainedMoney = parseFloat(availableMoney) - parseFloat(price);

  if (remainedMoney >= 0) {
    await axios.patch(BACKEND_URL + `/users/${databaseID}/stocks/${symbol}.json`, { quantity: newQuantity, price: newPrice });
    //await axios.patch(BACKEND_URL + `/users/${databaseID}/NetWorth.json`,remainedMoney);
    await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: remainedMoney });
  }
}

export async function DepositMoney(cardID, amount) {
  const databaseID = await AsyncStorage.getItem('databaseID');

  const cardData = await axios.get(BACKEND_URL + `/users/${databaseID}/cards/${cardID}.json`);

  const cardAmount = cardData.data.amount;
  const cardCurrency = cardData.data.currency;
  const newAmount = parseFloat(cardAmount) + parseFloat(amount);

  if (newAmount >= 0) {
    await axios.patch(BACKEND_URL + `/users/${databaseID}/cards/${cardID}.json`, { amount: newAmount });
    let availableAmount = 0;
    let NetWorthRaw = 0;
    try {
      availableAmount = await axios.get(BACKEND_URL + `/users/${databaseID}/NetWorth.json`);

      if (availableAmount.data !== null) NetWorthRaw = availableAmount.data;
    } catch (error) {
      await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: 0 });
      NetWorthRaw = 0;
    }

    const convertedAmount = await getValutarCourse('USD', cardCurrency, amount);

    const NetWorth = parseFloat(NetWorthRaw) - parseFloat(convertedAmount);
    if (NetWorth < 0) return Alert.alert("You don't have that much money to deposit!", "Verify that your ");

    await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: NetWorth });
  }
  else Alert.alert("Error!", "Verify your transaction informations");
}


export async function WithdrawMoney(cardID, amount) {
  const databaseID = await AsyncStorage.getItem('databaseID');

  const cardData = await axios.get(BACKEND_URL + `/users/${databaseID}/cards/${cardID}.json`);

  const cardAmount = cardData.data.amount;
  const cardCurrency = cardData.data.currency;
  const newAmount = cardAmount - amount;

  if (newAmount >= 0) {
    await axios.patch(BACKEND_URL + `/users/${databaseID}/cards/${cardID}.json`, { amount: newAmount });
    let availableAmount = 0;
    let NetWorthRaw = 0;
    try {
      availableAmount = await axios.get(BACKEND_URL + `/users/${databaseID}/NetWorth.json`);

      if (availableAmount.data !== null) NetWorthRaw = availableAmount.data;
    } catch (error) {
      console.log("ajung si eu aici ?");
      await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: 0 });
      NetWorthRaw = 0;
    }

    const convertedAmount = await getValutarCourse('USD', cardCurrency, amount);

    const NetWorth = parseFloat(NetWorthRaw) + parseFloat(convertedAmount);

    await axios.patch(BACKEND_URL + `/users/${databaseID}.json`, { NetWorth: NetWorth });
  }
  else Alert.alert("Too much!", "Please enter a withdraw number <= with the actual card available amount");
}



export async function getStock(symbol, name) {//aveam si un name,idk ce facea
  const API_KEY = '2HAZ31MOAL42TEVB';
  const STOCK_API_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(STOCK_API_URL);
    const data = await response.json();
    const result = data['Global Quote']['05. price'];
    const previousClose = data['Global Quote']['08. previous close'];
    const changePercent = ((result - previousClose) / previousClose) * 100;
    return { price: result, name: name, symbol: symbol, changePercent };
  } catch (error) {
    console.log('Error:', error);
  }
}



export async function getStockInfo(symbol) {

  const apiKey = '2HAZ31MOAL42TEVB';

  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const timeSeriesData = data['Monthly Adjusted Time Series'];

      const monthlyPrices = [];

      // Extract monthly prices from the data
      for (const date in timeSeriesData) {
        if (timeSeriesData.hasOwnProperty(date)) {
          const currentDate = new Date(date);
          const currentYear = currentDate.getFullYear();

          // Only include data for the last 5 years
          if (currentYear >= new Date().getFullYear() - 1) {
            monthlyPrices.push({
              date: currentDate,
              price: parseFloat(timeSeriesData[date]['4. close'])
            });
          }
        }
      }
      return monthlyPrices;
      //console.log(monthlyPrices);
    })
    .catch(error => console.error(error));
}

async function getter(path) {
  const response = await axios.get(`https://licentaase-520ca.firebaseio.com${path}.json`);
}

