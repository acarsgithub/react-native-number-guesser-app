import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Wrapper around text component for fontFamily to apply easily to any component 
const BodyText = props => {
  return (
    <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
  );
};

export default BodyText;

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
});