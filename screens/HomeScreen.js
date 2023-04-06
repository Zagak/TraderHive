import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getStockActualValue, storeUser } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../util/http";
import { Colors } from "../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { getAvailableMoney, getStocks } from "../util/http";
import { useIsFocused } from "@react-navigation/native";
import { PieChart } from 'react-native-chart-kit';
import { DeviceDimensions } from "../constants/DeviceDimensions";
import { FlatList } from "react-native-gesture-handler";



function HomeScreen() {
  const [user, setUser] = useState({});
  const [localId, setLocalId] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [money, setMoney] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [stocksValue, setStocksValue] = useState([]);

  const isFocused = useIsFocused();
  const authCtx = useContext(AuthContext);

  const total = 0;

  useEffect(() => {

    async function getAmountAvailable() {
      try {
        const money = await getAvailableMoney();
        if (money !== null) setMoney(money);
      } catch (error) {
        setMoney(0);
      }

    }

    if (isFocused === true) {

      getAmountAvailable();

    }

  }, [isFocused]);

  async function getUserInfo() {
    useEffect(() => {
      async function getUserData() {
        try {

          const userId = await AsyncStorage.getItem('id');
          console.log("USER ID= ", userId);
          setLocalId(userId);
          if (userId) {
            const response = await fetch(`https://licentaase-520ca-default-rtdb.firebaseio.com/users.json?auth=${authCtx.token}`);

            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.log('API request failed with status:', response.status);
            }
          } else {
            console.log('userId is null or undefined');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }

      getUserData();
    }, []);

    for (const utilizator in user) {
      if (user[utilizator].id === localId) {
        setUser(user[utilizator]);
        await AsyncStorage.setItem('databaseID', utilizator);
      }
    }
  }


  useEffect(() => {
    async function getDailyQuote() {
      const response = await axios.get('https://zenquotes.io/api/random');
      const newQuote = response.data[0].q;
      const newAuthor = response.data[0].a;
      await AsyncStorage.setItem('dailyQuote', newQuote);
      await AsyncStorage.setItem('dailyAuthor', newAuthor);
      setQuote(newQuote);
      setAuthor(newAuthor);
    }

    getDailyQuote();
  }, []);
  getUserInfo();


  const randomHslColor = () => {
    const hue = Math.floor(Math.random() * 360); // 0-359
    const saturation = 50; // fixed
    const lightness = 50; // fixed
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    async function getAllStocks() {
      const stocks = await getStocks();

      const myArray = Object.keys(stocks).map(key => {
        const color = randomHslColor();//`#${Math.floor(Math.random()*16777215).toString(16)}`;
        return {
          name: key,
          value: stocks[key].quantity,
          price: stocks[key].price,
          color: color,
          legendFontColor: '#120101',
          legendFontSize: 15,
        };
      });

      setStocks(myArray);
    }
    getAllStocks();

  }, []);

  async function getStockValue(symbol, quantity) {
    const value = await getStockActualValue(symbol, quantity);
    console.log("OwnedStock: " + value);
    return value;
  }

  const loadStocksValue = async () => {
    const promises = stocks.map(async (stock) => {
      const price = await getStockValue(stock.name, stock.value);
      return price;
    });
    await Promise.all(promises).then((resolvedValues) => setStocksValue(resolvedValues));


  };


  useEffect(() => {
    if (isFocused === true) loadStocksValue();
    // stocks.map((stock)=>{
    //   const price=getStockValue(stock.name,stock.value);
    //   setStocksValue((prevStocks) => [...prevStocks, price]);
    // });
  }, [isFocused]);


  useEffect(() => {
    console.log(1);
    console.log(stocksValue);
    console.log(2);
  }, [stocksValue]);


  const renderItem = ({ item, index }) => {
    console.log("name:" + item.name + "value:");
    console.log(stocksValue[index]);
    console.log(stocks[index]);
    console.log("index" + index);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.name}</Text>
        <Text style={styles.item}>{stocksValue[index]}</Text>
        <Text style={[styles.item, { fontWeight: 'bold' }, { color: ((stocksValue[index] - stocks[index].price) < 0) ? 'red' : 'green' }, { justifyContent: 'flex-end' }]}>{Math.abs((stocksValue[index] - stocks[index].price).toFixed(2))}</Text>

      </View>
    );
  };


  return (
    <LinearGradient colors={Colors.colors} style={styles.container}>

      <ImageBackground style={{ flex: 1 }} source={require("../images/Honeycomb.png")}>
        <ScrollView>
          <View style={styles.quoteContainer}>
            <View style={styles.titleContainer}>
              <Text style={[styles.welcome, { fontSize: 60, marginLeft: 0 }]}>HI</Text>
              <Text style={[styles.welcome, { alignSelf: 'flex-end' }, { marginBottom: 10 }]}>{`${user.name}`}</Text>
            </View>
            <View style={styles.titleContainer}>
              <FontAwesomeIcon icon={faQuoteLeft} />
              <Text style={[styles.welcome, styles.quote]}> {quote}</Text>
              <FontAwesomeIcon icon={faQuoteRight} style={{ alignSelf: 'flex-end' }} />
            </View>
            <Text style={[styles.welcome, styles.quote, { marginLeft: 30, marginTop: 5 }]}> - {author}</Text>
          </View>

          <View style={styles.chartContainer}>
            <PieChart
              data={stocks}
              width={DeviceDimensions.width + 50}
              height={300}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>


          <View style={styles.profile}>
            <Text style={styles.profileText}>Net Worth : {money.toFixed(2)} USD</Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.profileText}>Initial Invest : {(stocks.reduce((acc, value) => acc + value.price, 0)).toFixed(2)} USD</Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.profileText}>Invest Worth : {(stocksValue.reduce((acc, value) => acc + value, 0)).toFixed(2)} USD</Text>
          </View>
          <View style={styles.profile}>
            <Text style={[styles.profileText, { color: (stocks.reduce((acc, stock) => acc + stock.price, 0) - stocksValue.reduce((acc, value) => acc + value, 0)) >= 0 ? 'green' : 'red' }]}>
              ROI : {Math.abs(stocks.reduce((acc, stock) => acc + stock.price, 0) - stocksValue.reduce((acc, value) => acc + value, 0)).toFixed(2)} USD
            </Text>
          </View>

          {(stocksValue !== undefined) && <FlatList
            data={stocks}
            keyExtractor={(item) => item.name}
            renderItem={(data) =>
              renderItem(data)
            }
            nestedScrollEnabled={true}
          />}

        </ScrollView>
      </ImageBackground>
    </LinearGradient>


  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.font2,
    //paddingTop: 28,
  },
  itemContainer: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: Colors.font1,
    borderRadius: 8,
    width: '80%'
  },
  item: {
    paddingHorizontal: '10%',
    color: 'white',

  },
  quoteContainer: {
    //backgroundColor: Colors.font1,
    marginHorizontal: 12,
    borderRadius: 16,
    paddingVertical: 16,
    //borderColor:'#070745',
    //borderWidth:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 9,
  },
  titleContainer: {
    flexDirection: 'row',
    marginLeft: 20
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 30,
    marginRight: -15,
    color: 'white',
  },
  quote: {
    fontSize: 16,
    textAlign: 'left',
    marginRight: 10,
    marginLeft: 0,
    marginRight: 0,
    width: '80%'
  },
  profile: {
    backgroundColor: Colors.font1,
    marginHorizontal: 18,
    marginVertical: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 8,

  },
  profileText: {
    color: 'white',
    fontSize: 28
  }
});