import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import Button from "../components/Button";
import ExpenseShow from "../components/ExpenseShow";
import { useContext, useEffect, useState } from "react";
import { getExpenses, getValutarCourse } from "../util/http";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";


function ExpensesScreen({ navigation, route }) {
    const [expenses, setExpenses] = useState({});
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function getUserExpenses() {
            const userExpenses = await getExpenses();
            setExpenses(userExpenses);
        }

        getUserExpenses();
    }, []);


    useEffect(() => {
        if (expenses !== null) setExpenses([...Object.values(expenses), route.params])
        else setExpenses([route.params])
    }, [route]);


    const renderItem = ({ item }) => (
        <ExpenseShow expense={item} />
    );


    return (

        <ImageBackground style={styles.imageBackground} source={require("../images/Honeycomb.png")}>
            <LinearGradient colors={['#e6e600', '#FFE600', '#D9AE00']} style={styles.container}>
                {expenses !== null && (
                    <FlatList
                        data={Object.values(expenses)}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </LinearGradient>
        </ImageBackground>

    );
}

export default ExpensesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        
    },
});
