import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import colors from '../constants/colors';


const MainButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default MainButton;


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },

  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});