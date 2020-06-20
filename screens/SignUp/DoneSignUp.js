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

const DoneSignUp = () => {
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
      <Text>Welcome to </Text>
      <Text>Say goodbye to indecision and hangriness.</Text>
      <Button
        title="Sign up"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default DoneSignUp;
