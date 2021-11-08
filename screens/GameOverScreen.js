import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, View, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  if (availableDeviceHeight < 500) {

    return (
      <ScrollView>
        <View style={{...styles.screen, marginTop: '8%'}} >
          <View style={{...styles.resultContainer, marginVertical: availableDeviceHeight / 30 }}>
            <BodyText style={{...styles.resultText, fontSize: availableDeviceHeight < 400 ? 17 : 19}}>
              Your phone needed <Text style={styles.highlight}>{props.numRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
          </View>
          <MainButton onPress={{...props.configureNewGame}}>NEW GAME</MainButton>
        </View>
      </ScrollView>
    );

  } else {

    return (
      <ScrollView>
        <View style={styles.screen} >
          <Text style={styles.title}>Game Over!</Text>
          <View style={{
              ...styles.imageContainer, 
              borderRadius: availableDeviceWidth * 0.7 / 2,
              height: availableDeviceWidth * 0.7,
              width: availableDeviceWidth * 0.7,
              marginVertical: availableDeviceHeight / 18
            }}>
            <Image 
              fadeDuration={1000}
              source={require('../assets/success.png')} 
              style={styles.image} 
              resizeMode="cover" 
            /> 
          </View>
          <View style={{...styles.resultContainer, marginVertical: availableDeviceHeight / 40 }}>
            <BodyText style={{...styles.resultText, fontSize: availableDeviceHeight < 400 ? 17 : 19}}>
              Your phone needed <Text style={styles.highlight}>{props.numRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
          </View>
          <MainButton onPress={props.configureNewGame}>NEW GAME</MainButton>
        </View>
      </ScrollView>
    );

  };
};

export default GameOverScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },

  title: {
    fontSize: 22.5,
    fontFamily: 'open-sans-bold',
    marginTop: 10
  },

  image: {
    width: '100%',
    height: '100%'
  },

  imageContainer: {
    borderColor: 'black',
    borderWidth: 3, 
    overflow: 'hidden'
  },

  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },

  resultContainer: {
    marginHorizontal: 30
  },

  resultText: {
    textAlign: 'center'
  }
});