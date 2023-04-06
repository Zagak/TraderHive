import { View, Text, StyleSheet, Pressable,Image } from "react-native";
import { Colors } from "../constants/Colors";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEuro, faLandmark, faDollar, faPoundSign, faYenSign } from "@fortawesome/free-solid-svg-icons";
import GlowingBorder from "./GlowingBorder";
import { Modal } from "react-native";

function Card({ card ,onWithdraw,onDeposit}) {

    if (card) return (

        <View style={styles.container}>
            <Text style={styles.textType}>{card.name}</Text>
            <View style={styles.imageContainer}>
                <Image source={require("../images/card_back.png")} style={styles.image} />
            </View>
            <View style={styles.transfer}>
                <Pressable onPress={onDeposit} style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
                    <FontAwesomeIcon style={styles.deposit} icon={faLandmark} color={'green'} size={28} />
                </Pressable>
                <Pressable onPress={onWithdraw} style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
                    <FontAwesomeIcon style={styles.withdraw} icon={faLandmark} color={'red'} size={28} />
                </Pressable>
            </View>
            <View style={styles.moneyContainer}>
                <Text style={styles.textMoney}>{card.amount}</Text>
                {card.currency !== 'RON' ? (
                    <FontAwesomeIcon icon={
                        (() => {
                            switch (card.currency) {
                                case "EUR":
                                    return faEuro;
                                case "USD":
                                    return faDollar;
                                case "GBP":
                                    return faPound;
                                case "JPY":
                                    return faYenSign;
                                default:
                                    return null;
                            }
                        })()
                    } color={'white'} size={36} />
                ) : (

                    <Text style={styles.RON}>RON</Text>

                )}
                
            </View>
        </View>

    );
    else return null;
}

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.font1,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 12,
        marginHorizontal: 18,
        borderRadius: 16,
        borderColor:'#070745',
        borderWidth:10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textType: {
        color: 'white',
        marginBottom: 36,
        fontSize: 36
    },
    textMoney: {
        color: 'white',
        fontSize: 28,
        marginRight:8
    },
    RON:{
        color:'white',
        fontSize:36,
        fontWeight:'bold'
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transfer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16
    },
    deposit: {
        marginRight: 14,
    },
    withdraw: {
        marginRight: 28
    },
    image:{
        width:60,
        height:60,
        position:'relative',
        left:68,
        bottom:24
    },
    imageContainer:{
        width:1,
        height:1
    }

});

