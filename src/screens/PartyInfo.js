import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';
import {
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  BODY_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
} from '../common';
import NextButton from '../components/NextButton';
import Container from '../components/Container';
import StepSection from '../components/StepSection';
import StepTitleWithIcon from '../components/StepTitleWithIcon';

const PartyInfo = ({ route, navigation }) => {
  const [partyName, setPartyName] = useState('');
  const [partySize, setPartySize] = useState(0);

  // extract data from route (variable name must equal whatever passed in)

  // helper functions to handle user input
  const onChangePartySize = (partySize) => {
    setPartySize(partySize);
  };

  const onChangePartyName = (partyName) => {
    setPartyName(partyName);
  };

  const handleNext = () => {
    if (!partyName || !partySize) {
      Alert.alert(
        'Empty field',
        'Please enter all info',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.navigate('Search', {
        partyName: partyName,
        partySize: partySize,
      });
    }
  };
  return (
    <Container>
      <StepTitleWithIcon title='Get the party started!' iconName='balloon' />
      <StepSection>
        <TextInput
          placeholder='Party Name'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={onChangePartyName}
        />
        <TextInput
          placeholder='Party Size'
          keyboardType={'numeric'}
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={onChangePartySize}
        />
      </StepSection>
      <NextButton onPress={handleNext} />
    </Container>
  );
};

const styles = StyleSheet.create({
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
  },
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
});

export default PartyInfo;
