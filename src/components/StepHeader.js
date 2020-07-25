import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  BODY_BOTTOM,
  COLOR_PRIMARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  SECTION_HEIGHT,
  HEADING_BOTTOM,
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  STEP_HEIGHT,
  STEP_SUBSCRIPT_FONT_SIZE,
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
  BODY_FONT_SIZE,
  STEP_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from "../common";

const StepHeader = ({ step, subscript }) => {
  return (
    <View style={{ height: STEP_HEIGHT }}>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.stepSubscript}>{subscript}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  step: {
    alignSelf: "center",
    fontSize: STEP_FONT_SIZE,
    fontFamily: "karla-bold",
  },
  stepSubscript: {
    alignSelf: "center",
    fontSize: STEP_SUBSCRIPT_FONT_SIZE,
    fontFamily: "karla-bold",
  },
});

export default StepHeader;
