import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const Input = ({ label, imageSource,color,keyboardType,secure=false ,onAuthenticate,textChange}) => {
    

    const handleInputChange = (value) => {
   
        onAuthenticate(value);
    };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            left: 0,
            top: 0,
            borderRadius:16
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={label}
            placeholderTextColor="#fff"
            color='#fff'
            onChangeText={onAuthenticate ? handleInputChange:textChange}
            style={[styles.input,color]}
            keyboardType={keyboardType}
            secureTextEntry={secure}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: 300,
    height: 60,
    position: 'relative',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.font1,
    borderRadius: 16,
    padding: 10,
    marginLeft: 80,
    marginRight:-20,
  },
  input: {
    flex: 1,
  },
});

export default Input;
