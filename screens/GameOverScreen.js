import React from 'react';
import { Text, StyleSheet, Button, View, Image } from 'react-native';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen} >
      <Text style={styles.title}>Game Over!</Text>
      <View style={styles.imageContainer}>
        <Image 
          fadeDuration={1000}
          source={require('../assets/success.png')} 
          style={styles.image} 
          resizeMode="cover" 
        /> 
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{props.numRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={props.configureNewGame}>NEW GAME</MainButton>
    </View>
  )
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 22.5,
    fontFamily: 'open-sans-bold'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  imageContainer: {
    borderRadius: 150,
    borderColor: 'black',
    borderWidth: 3, 
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 20
  },

  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },

  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },

  resultText: {
    textAlign: 'center',
    fontSize: 19
  }
});