import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_PRIMARY } from '../common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NextButton = ({ onPress }) => {
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Icon style={{ color: 'white' }} name='chevron-right' size={35} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    alignSelf: 'flex-end',
    marginRight: 0,
    marginBottom: hp('1%'),
    top: hp('11%'),
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NextButton;
