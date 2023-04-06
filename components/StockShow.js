import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faDollar } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


function StockShow({ symbol, price, changePercent, name }) {
    const navigation=useNavigation();

    const onPressHandler = () => {
        navigation.navigate("StockInfo",symbol);
    };

    return (
        <Pressable onPress={onPressHandler}>
            <View style={styles.container}>
                <View style={styles.symbol}>
                    <Text style={[styles.text, { fontSize: 12 }]}>{(name.length > 40) ? name.slice(0, 40) + "..." : name}</Text>
                    <Text style={[styles.text, { fontSize: 18 }]}>{symbol}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={[styles.info, { marginBottom: 8 }]}>
                        <Text style={styles.text}>{price}</Text>
                        <FontAwesomeIcon icon={faDollar} style={{ color: 'white' }} />
                    </View>
                    <View style={styles.info}>
                        <FontAwesomeIcon icon={(changePercent > 0) ? faArrowTrendUp : faArrowTrendDown} size={24} style={{ color: (changePercent > 0) ? 'green' : 'red' }} />
                        <Text style={styles.text}>{changePercent.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default StockShow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 24,
        marginVertical: 12,
        backgroundColor: Colors.font1,
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingVertical: 18,
        justifyContent: 'space-between'
    },
    symbol: {
        // marginRight:200
    },
    text: {
        color: 'white',
    },
    infoContainer: {
        justifyContent: 'space-between'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});