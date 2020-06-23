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

const LocationSignUp = () => {
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
      <Text>Where do you live?</Text>
      {/* Map??? lol */}
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("DoneSignUp")}
      ></Button>
    </View>
  );
};

export default LocationSignUp;
