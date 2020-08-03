import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import firebase from "../firebase.js";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import "../global";

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    errorMessage: null,
  });

  const handleLogin = () => {
    const email = userInfo.email;
    const password = userInfo.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch((error) => setUserInfo({ ...userInfo, errorMessage: error }));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.icon}>
          <Icon color="black" name="phone-outline" size={25} />
        </View>
      </View>
      <Text style={{ fontFamily: "karla-bold", fontSize: 40 }}>
        What's your {"\n"}phone number?
      </Text>
      {userInfo.errorMessage && (
        <Text style={{ color: "red" }}>{userInfo.errorMessage}</Text>
      )}
      <View>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(email) => setUserInfo({ ...userInfo, email: email })}
          value={userInfo.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(password) =>
            setUserInfo({ ...userInfo, password: password })
          }
          value={userInfo.password}
        />
      </View>
      {/* <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate("LocationSignUp")}
      /> */}
      <View style={styles.buttonView}>
        {/* <TouchableOpacity onPress={handleLogin}> */}
        <TouchableOpacity onPress={() => navigation.navigate("StartSignUp")}>
          <View style={styles.button}>
            <Icon style={{ color: "white" }} name="chevron-right" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: 30,
  },
  buttonView: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: global.orange,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: global.orange,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    top: "100%",
  },
  textInput: {
    alignSelf: "stretch",
    padding: 5,
    fontFamily: "karla-bold",
    fontSize: 35,
    borderBottomColor: "#000",
    margin: 5,
    marginBottom: 20,
    width: deviceWidth * 0.75,
    borderBottomWidth: 3,
    bottom: "15%",
  },
});

export default Login;
