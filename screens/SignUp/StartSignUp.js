import React from "react";
import { useNavigation } from "@react-navigation/native";
// import ".../global";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

const StartSignUp = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bigContainer}>


      <View style={styles.container}>
        <Text style={styles.normTxt}>Looks like you're new!</Text>
        <Text style={styles.normTxt}>Make an account to start a party!</Text>

        <View style={{ height: '1%', width: '10%', padding: 10, backgroundColor: global.yellow }} />


        <Text style={styles.shadowTxt}>party!</Text>


      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("NameSignUp")}
      >
        <Text style={styles.btnTxt}>Sign Up</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: "20%",
    paddingRight: "15%",
    marginTop: "20%",
    marginBottom: "30%",
  },
  btn: {
    backgroundColor: global.orange,
    width: "100%",
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
  shadowTxt: {
    fontFamily: "karla-bold",
    fontSize: 40,
    // position: 'absolute'

  },
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: 40,
  },
});

export default StartSignUp;
