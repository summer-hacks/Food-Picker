import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLOR_PRIMARY } from '../common';

const BottomButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonView}>
      <Text style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: COLOR_PRIMARY,
    width: '100%',
    height: '12%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontFamily: 'karla-bold',
    fontSize: 30,
  },
});

export default BottomButton;
