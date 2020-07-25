import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CONTAINER_PADDING_LEFT, CONTAINER_PADDING_RIGHT, COLOR_PRIMARY, COLOR_SECONDARY, BODY_BOTTOM, FONT_NORMAL } from '../../common';

const DoneSignUp = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <View style={{ bottom: BODY_BOTTOM }}>
        <Text style={[styles.normTxt, { bottom: BODY_BOTTOM }]}>Welcome to <Text style={styles.shadowTxt}>Chikin Tinder.</Text></Text>
        <Text style={styles.normTxt}>Say <Text style={{ color: COLOR_PRIMARY, fontFamily: FONT_NORMAL }}>goodbye </Text>to indecision and hangriness.</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnTxt}>Start Swiping</Text>
      </TouchableOpacity>
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
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: 38,
  },
  shadowTxt: {
    fontFamily: "karla-regular",
    fontSize: 38,
    backgroundColor: COLOR_SECONDARY,
  },
  btn: {
    backgroundColor: COLOR_PRIMARY,
    width: "145%",
    height: "12%",
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "white",
    fontFamily: "karla-bold",
    fontSize: 30,
  },
})

export default DoneSignUp;
