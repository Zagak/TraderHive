import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import Input from './components/Input';
import { Colors } from './constants/Colors';
import HomeScreen from './screens/HomeScreen';
import { useContext } from 'react';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseChimney, faMoneyBillWave, faPlusCircle, faRightFromBracket, faMoneyBillTrendUp, faCreditCard, faSquarePlus, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import PaymentForm from './components/PaymentForm';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import CurrencyMenu from './components/CurrencyMenu';
import StocksScreen from './screens/StocksScreen';
import CardsScreen from './screens/CardsScreen';
import CardForm from './components/CardForm';
import StockInfo from './components/StockInfo';
import * as Notifications from 'expo-notifications';
import { getEconomisEvent } from './util/http';
import BackgroundFetch from 'react-native-background-fetch';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import Button from './components/Button';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  }
});



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function AuthentificatedDrawer() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: Colors.font1 },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: Colors.font1,
        tabBarActiveTintColor: Colors.font2,
        tabBarInactiveTintColor: Colors.font1,

      },

    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ size, focused }) => (
          <FontAwesomeIcon icon={faHouseChimney} size={size} style={{ color: focused ? 'white' : 'grey' }} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'white' : 'grey' }}>Home</Text>
        ),
        headerRight: () => (
          <Pressable
            style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
            onPress={() => {
              //Alert.alert("Pressed");
              authCtx.logout();
            }}
            title="Info"
            color="#fff"
          >

            <FontAwesomeIcon icon={faDoorOpen} size={28} style={{ marginRight: 12, color: 'white' }} />

          </Pressable>
        )
      }} />
      <Tab.Screen name="Stocks" component={StocksScreen} options={{
        tabBarIcon: ({ size, focused }) => (
          <FontAwesomeIcon icon={faMoneyBillTrendUp} size={size} style={{ color: focused ? 'white' : 'grey' }} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'white' : 'grey' }}>Stocks</Text>
        ),
      }} />
      <Tab.Screen name="StockInfo" component={StockInfo} options={{
        tabBarButton: () => null,
        tabBarVisible: false,
        tabBarStyle: { display: "none" },
        headerRight: () => (
          <Pressable
            style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
            onPress={() => {
              navigation.navigate("Stocks");
            }}
            title="Info"
            color="#fff"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size={28} style={{ marginRight: 12, color: 'white' }} />
          </Pressable>
        )
      }} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} options={{
        tabBarIcon: ({ size, focused }) => (
          <FontAwesomeIcon icon={faMoneyBillWave} size={size} style={{ color: focused ? 'white' : 'grey' }} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'white' : 'grey' }}>Expenses</Text>
        ),
        headerRight: () => (
          <View style={styles.headerButtons}>
            <Pressable
              style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
              onPress={() => {
                //Alert.alert("Pressed");
                navigation.navigate("Form");
              }}
              title="Info"
              color="#fff"
            >
              <FontAwesomeIcon icon={faPlusCircle} size={28} style={{ marginRight: 12, color: 'white' }} />
            </Pressable>

          </View>
        )
      }} />
      <Tab.Screen name="Form" component={PaymentForm} options={{
        tabBarButton: () => null,
        tabBarVisible: false,
        tabBarStyle: { display: "none" },
        headerRight: () => (
          <Pressable
            style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
            onPress={() => {
              navigation.navigate("Expenses");
            }}
            title="Info"
            color="#fff"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size={28} style={{ marginRight: 12, color: 'white' }} />
          </Pressable>
        )
      }} />
      <Tab.Screen name="Cards" component={CardsScreen} options={{
        tabBarIcon: ({ size, focused }) => (
          <FontAwesomeIcon icon={faCreditCard} size={size} style={{ color: focused ? 'white' : 'grey' }} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'white' : 'grey' }}>Cards</Text>
        ),
        headerRight: () => (
          <Pressable
            style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
            onPress={() => {
              //Alert.alert("Pressed");
              navigation.navigate("CardForm");
            }}
            title="Info"
            color="#fff"
          >
            <FontAwesomeIcon icon={faSquarePlus} size={28} style={{ marginRight: 12, color: 'white' }} />
          </Pressable>
        ),
      }} />
      <Tab.Screen name="CardForm" component={CardForm} options={{
        tabBarButton: () => null,
        tabBarVisible: false,
        tabBarStyle: { display: "none" },
        headerRight: () => (
          <Pressable
            style={({ pressed }) => [{}, pressed && { opacity: 0.7 }]}
            onPress={() => {
              navigation.navigate("Cards");
            }}
            title="Info"
            color="#fff"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size={28} style={{ marginRight: 12, color: 'white' }} />
          </Pressable>
        )
      }} />
    </Tab.Navigator>

  );
}


function AuthentificationStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.font1 },
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token !== null) {
        authCtx.authenticate(token);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthentificationStack />}
      {authCtx.isAuthenticated && <AuthentificatedDrawer />}
    </NavigationContainer>
  );
}

export default function App() {
  const [notificationUrl, setNotificationUrl] = useState(null);

  useEffect(()=>{
    const subscription1 = Notifications.addNotificationReceivedListener((notification)=>{
      console.log('Notification Received');
      console.log(notification);
      const url = notification.request.content.data.url;
      console.log(url);
    });
  
    const subscription2=Notifications.addNotificationResponseReceivedListener((response)=>{
      console.log('Notification Response Received');
      console.log(response);
      const url = response.notification.request.content.data.url;
      setNotificationUrl(url);
    });
  
    return ()=>{
      subscription1.remove();
      subscription2.remove();
    }
    
  },[]);

  function ScheduleNotificationHandler(events) {
    Notifications.scheduleNotificationAsync({
      
      content: {
        title: "News",
        body: "Some news for ya",
        data: { url: events[0].url }
      },
      trigger: {
        seconds: 1
      }
    });
  }

  ///

  useEffect(() => {
    const initBackgroundFetch = async () => {

      const handleTask = async (taskId) => {

        console.log('[ RNBF TASK ID ]', taskId)
        console.log("a mers maiiii");
        getEconomisEvent().then(events=>{
          ScheduleNotificationHandler(events);
        });
        // DO BACKGROUND WORK HERE
        
        // This MUST be called in order to signal to the OS that your task is complete
        BackgroundFetch.finish(taskId)

      }

      const onTimeout = async (taskId) => {

        // The timeout function is called when the OS signals that the task has reached its maximum execution time.

        // ADD CLEANUP WORK HERE (IF NEEDED)

        BackgroundFetch.finish(taskId)

      }

      const status = await BackgroundFetch.configure({minimumFetchInterval: 15}, handleTask, onTimeout)

      console.log('[ RNBF STATUS ]', status)

    }

    initBackgroundFetch()
  }, []);
  //





  useEffect(() => {
    getEconomisEvent().then(event=>{
      console.log(event[0].url);
    });
  }, []);

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert("Permission required!", "Push notifications need the appropiate permission");
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();
  }, [])

  

  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor={Colors.font1} style="light" />
      {notificationUrl && (
        <View style={styles.webPage}>
          <WebView source={{ uri: notificationUrl }} />
          <Button onPress={()=>setNotificationUrl(null)}>Go Back</Button>
        </View>
      )}
      {!notificationUrl &&(
      <AuthContextProvider>
        <View style={{ zIndex: 1,flex:1 }}> 
        <Navigation />
        </View>
      </AuthContextProvider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',

  },
  currency: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 18,
    marginTop: 4
  },
  webPage:{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    flex:1
  }
});


