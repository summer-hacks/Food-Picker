import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLOR_PRIMARY } from "../common";
const Dollar = ({ dollars, clicked, handleClick }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.dollar,
        backgroundColor: clicked ? "salmon" : "white",
      }}
      onPress={handleClick}
    >
      <Text
        style={{
          textAlign: "center",
          color: clicked ? "white" : "salmon",
        }}
      >
        {dollars}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  dollar: {
    height: 50,
    width: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: COLOR_PRIMARY,
    borderStyle: "solid",
    borderWidth: 2,
  },
});

export default Dollar;
