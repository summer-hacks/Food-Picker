import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  STEP_HEIGHT,
  STEP_SUBSCRIPT_FONT_SIZE,
  STEP_FONT_SIZE,
} from '../common';

const StepHeader = ({ step, subscript, mb }) => {
  return (
    <View style={{ height: STEP_HEIGHT, marginBottom: mb ?? 0 }}>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.stepSubscript}>{subscript}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  step: {
    alignSelf: 'center',
    fontSize: STEP_FONT_SIZE - 1,
    fontFamily: 'karla-bold',
  },
  stepSubscript: {
    alignSelf: 'center',
    fontSize: STEP_SUBSCRIPT_FONT_SIZE,
    fontFamily: 'karla-regular',
  },
});

export default StepHeader;
