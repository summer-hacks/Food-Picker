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

const EmailSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNum: "",
    errorMessage: null,
  });
  const navigation = useNavigation();
  return (
    <View>
      <Text>Step 3 of 4</Text>
      <Text>What's your email?</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        //style={styles.textInput}
        onChangeText={(email) => setUserInfo({ ...userInfo, email: email })}
        value={userInfo.email}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("EmailSignUp")}
      ></Button>
    </View>
  );
};

export default EmailSignUp;
