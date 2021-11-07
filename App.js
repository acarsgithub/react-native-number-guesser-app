
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'; 


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [selectedNumber, setSelectedNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={(err) => console.log(err)}
      />
    );
  };

  const configureNewGameHandler = () => {
    setNumGuesses(0);
    setSelectedNumber(null);
  };

  const startGameHandler = number => {
    setSelectedNumber(number);
  };

  const gameOverHandler = numRounds => {
    setNumGuesses(numRounds);
  }

  let content = <StartGameScreen onStartGameScreen={startGameHandler} />

  if (selectedNumber && numGuesses <= 0) {
    content = <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler} />
  } else if (numGuesses > 0) {
    content = <GameOverScreen userNumber={selectedNumber} numRounds={numGuesses} configureNewGame={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen} >
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
