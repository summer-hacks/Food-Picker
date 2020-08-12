import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  COLOR_PRIMARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  SECTION_HEIGHT,
  HEADING_BOTTOM,
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from '../common';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StepTitleWithIcon = ({ title, iconName }) => {
  return (
    <View style={{ bottom: HEADING_BOTTOM + 20, height: SECTION_HEIGHT }}>
      <View style={styles.icon}>
        <Icon color='black' name={iconName} size={25} />
      </View>
      <Text style={styles.normTxt}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderWidth: ICON_BORDER_WIDTH,
    borderColor: COLOR_PRIMARY,
    borderRadius: ICON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
  },
});

export default StepTitleWithIcon;
