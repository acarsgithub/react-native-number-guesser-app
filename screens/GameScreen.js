import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';



const generateRandomBetween = (min, max, exclude) => { 
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor((Math.random() * (max - min)) + min);
  if (rndNum === exclude && max !== min) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, rounds) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>#{rounds}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};


const GameScreen = props => {

  const minValue = useRef(1);
  const maxValue = useRef(100);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const {userChoice, onGameOver} = props;

  useEffect(() => { 
    if (currentGuess === userChoice){
      onGameOver(pastGuesses.length);
    };
  }, [currentGuess, userChoice, onGameOver]);


  const nextGuessHandler = (direction) => {

    if (((direction === 'lower' && currentGuess < props.userChoice)) || ((direction === 'greater' && currentGuess > props.userChoice))) {
      Alert.alert('Don\'t Lie!', 'You know that\'s wrong...', [{text: 'Sorry', style: 'cancel'}]);
      return;
    }

    if (direction === 'lower') {
      maxValue.current = currentGuess;
    } else {
      minValue.current = currentGuess + 1;
    };

    const nextNumber = generateRandomBetween(minValue.current, maxValue.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Computer's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer} >
        <Button title="LOWER" color="red" onPress={nextGuessHandler.bind(this, 'lower')} ></Button>
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} ></Button>
      </Card>
      <View style={styles.listContainer}>
        <Text style={styles.scrollTitle}>Guess History</Text>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - (index)))}
        </ScrollView>
      </View>
    </View>
  )
};


export default GameScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 20
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    width: 300,
    maxWidth: '80%'
  },

  text: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10
  },

  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection :'row',
    justifyContent : 'space-between',
    paddingHorizontal: 25
  },

  listContainer: {
    width: '50%',
    flex: 1
  },

  list: {
    justifyContent: 'flex-end',
    flexGrow : 1
  },

  scrollTitle: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    marginTop: 10
  }
});