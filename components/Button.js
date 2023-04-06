import { Pressable ,StyleSheet,View,Text} from "react-native";
import { Colors } from "../constants/Colors";

function Button({ children, onPress,style }) {
    return (

        <Pressable onPress={onPress} style={({ pressed }) => [[styles.button,style], pressed && styles.pressed]}>
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>

    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 18,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: Colors.font1,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width:'40%',
        alignSelf:'center',
        marginTop:48,
        borderWidth:6

    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
    },
  });