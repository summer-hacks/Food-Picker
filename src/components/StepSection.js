import React from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { BODY_BOTTOM, SECTION_HEIGHT } from "../common";
const StepSection = ({ children }) => {
  return (
    <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
      {children}
    </View>
  );
};

export default StepSection;
