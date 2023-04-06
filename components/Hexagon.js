import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';


function Hexagon({ children, width, height, background}) {
    return (
        <View style={[styles.hexagonContainer, { width: width, height: height }]}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                <Polygon
                    points="50 0 95 25 95 75 50 100 5 75 5 25"
                    fill={background}
                    stroke="#000"
                    strokeWidth="2"

                />
            </Svg>
            <View style={[styles.hexagonTextContainer,{
                left:children.props.children.toString().length === 1 ? '87%' 
                : children.props.children.toString().length === 2 ? '77%' 
                : children.props.children.toString().length === 3 ? '67%'
                : children.props.children.toString().length === 4 ? '57%'
                : '47%',
            }]}>
                <Text style={styles.hexagonText}>{children}</Text>
            </View>
        </View>
    );
}

export default Hexagon;

const styles = StyleSheet.create({
    hexagonContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    hexagonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    hexagonTextContainer: {
        position: 'absolute',
        top: '38%',
        transform: [{ translateX: -25 }, { translateY: -8 }],

    },
});