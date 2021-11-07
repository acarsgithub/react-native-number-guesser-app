import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import colors from '../constants/colors';

// {...props} will spread all the props you passed into the component and apply them 
const Input = props => {
  return <TextInput {...props} style={{...styles.input, ...props.style }} />
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10  
  }
});