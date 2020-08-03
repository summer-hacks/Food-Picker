import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  HEADING_FONT_SIZE,
  HEADING_BOTTOM,
  HEADING_PADDING_TOP,
} from "../common";

const BigHeader = ({ title }) => {
  return <Text style={styles.bigTxt}>{title}</Text>;
};
const styles = StyleSheet.create({
  bigTxt: {
    fontFamily: "karla-bold",
    fontSize: HEADING_FONT_SIZE,
    paddingBottom: HEADING_BOTTOM,
    paddingTop: HEADING_PADDING_TOP,
    textAlign: "center",
  },
});

export default BigHeader;
