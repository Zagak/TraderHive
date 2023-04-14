import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import Card from "../components/Card";
import { getCards } from "../util/http";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { WithdrawMoney ,DepositMoney} from "../util/http";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { ImageBackground } from "react-native";


function CardsScreen({ route }) {
    const [cards, setCards] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [Sum, setSum] = useState(0);
    const [cardID,setCardID] = useState('');
    const [loading,setLoading] = useState(false);
    const [actionType,setActionType] = useState('');

    useEffect(() => {
        async function getUserCards() {
            const allCards = await getCards();
            setCards(allCards);
        }
        setTimeout(() => {
            getUserCards();
        }, 1000);
    }, [route,modalVisible]);

    useEffect(() => {
        if (cards !== null) setCards([...Object.values(cards), route.params])
        else setCards([route.params])

    }, [route]);

    useEffect(() => {
        console.log(Sum);
    }, [Sum]);


    
    async function updateCard(cardID) {
        
        setLoading(true);
        if(Sum!==0){
            if(actionType=='withdraw')await WithdrawMoney(cardID, Sum)
            else await DepositMoney(cardID,Sum);
        }
        setModalVisible(false);
        setLoading(false);
    }


    if(loading) return <Loading>This may take a little while!</Loading>

    const renderItem = ({ item, index }) => (
        <View>
            <Card
                card={item}
                onWithdraw={() => {setCardID(Object.keys(cards)[index]),setActionType('withdraw'),setModalVisible(true)}}//updateCard(Object.keys(cards)[index])}//updateCard(Object.keys(cards)[index])} 
                onDeposit={() => {setCardID(Object.keys(cards)[index]),setActionType('deposit'),setModalVisible(true)}}
            />
        </View>

    );

    return (
        <LinearGradient colors={['#e6e600', '#FFE600', '#D9AE00']} style={styles.container}>
            <ImageBackground style={{flex:1}} source={require("../images/Honeycomb.png")}>
            {cards !== null && (
                <FlatList
                    data={Object.values(cards)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            <Modal visible={modalVisible} animationType={'slide'} transparent={true}>
                <View style={styles.modalContainer}>
                    <Input textChange={setSum} />
                    <Button onPress={() => {updateCard(cardID)}}>{actionType=='withdraw'?'Withdraw':'Deposit'}</Button>
                </View>
            </Modal>
            </ImageBackground>
        </LinearGradient>
    );
}

export default CardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        backgroundColor: Colors.font4,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 100,
        width: '92%',
        height: 200,
    },
});