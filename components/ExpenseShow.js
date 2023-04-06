import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import Hexagon from './Hexagon';

function ExpenseShow({expense}) {
    if(expense)return (
        <View style={styles.container}>
            <View >
                <Text numberOfLines={1} style={[styles.text,styles.name]}>{`${expense.name}`}</Text>
                <Text numberOfLines={2} style={[styles.text,styles.description]}>{`${expense.description}`}</Text>
            </View>
            <View style={styles.details}>
                <Hexagon width={50} height={50} background={Colors.font3} >
                    <Text style={[styles.text,styles.price]}>{`${expense.price}`}</Text>
                </Hexagon>
                <Hexagon width={50} height={50} background={Colors.font4} >
                    <Text style={[styles.text,styles.quantity]}>{expense.quantity===''?1:`${expense.quantity}`}</Text>
                </Hexagon>
            </View>
        </View>
    );
    else return null;
}

export default ExpenseShow;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:'5%',
        borderRadius:12,
        backgroundColor: Colors.font1,
        flexDirection:'row',
        marginTop:12,
        paddingHorizontal:12,
        justifyContent:'space-around',
        paddingVertical:4,
        
    },
    text:{
        color:'white'
    },
    name:{
        fontSize:24,
        width:100
    },
    description:{
        width:100
    },
    price:{
        fontSize:18,
        paddingHorizontal:18,
        borderRadius:12,
        marginBottom:12,
    },
    quantity:{
        fontSize:18,
        paddingHorizontal:18,
        borderRadius:12,
    },
    details:{
        flexDirection:'row',
        top:'10%',
        left:'10%'
    }
});