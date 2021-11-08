import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert, 
  Dimensions, 
  ScrollView, 
  KeyboardAvoidingView 
} from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import Input from '../components/Input';
import BodyText from '../components/BodyText';


const StartGameScreen = props => {

  const [userInput, setUserInput] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3.5);

  
  useEffect(() => {

    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 3.5);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }

  });


  const inputHandler = newUserInput => {
    setUserInput(newUserInput.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => { 
    setUserInput('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(userInput);
    if (Number.isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      console.log(chosenNumber);
      Alert.alert(
        "Invalid Number!", 
        "Input must be a number between 1 and 99", 
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      );
      return;
    };

    setConfirmed(true);
    setSelectedNumber(parseInt(userInput));
    setUserInput('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedOutputContainer}>
        <BodyText>Number Selected:</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={props.onStartGameScreen.bind(this, selectedNumber)} >START GAME</MainButton>
      </Card>
    );
  };

  return (

    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} >
          <View style={styles.screen} >
            <Text style={styles.title}>Start New Game!</Text>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.text} >Enter Number</BodyText>

              <Input 
                style={styles.input} 
                blurOnSubmit 
                autoCapitalize="none" 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2}
                value={userInput}
                onChangeText={inputHandler}
              />

              <View style={styles.buttonContainer} >
                <View style={{ width: buttonWidth }}>
                  <Button 
                    title="Reset" 
                    color={colors.accent} 
                    onPress={resetInputHandler} 
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button 
                    title="Confirm" 
                    color={colors.primary} 
                    onPress={confirmInputHandler} 
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>

  );
};


export default StartGameScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },

  inputContainer: {
    minWidth: 300,
    maxWidth: '95%',
    width: "80%",
    alignItems: 'center',
    marginTop: 15
  },

  title: {
    fontSize: 20,
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },

  input: {
    width: 75,
    textAlign: 'center'
  },

  confirmedOutputContainer: {
    marginTop: 30,
    alignItems: 'center'
  },

  text: {
    fontFamily: 'open-sans'
  }
});