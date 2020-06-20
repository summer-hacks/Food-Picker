import React, { useState } from "react";
import { StyleSheet, Text, View, Button, DatePickerIOS } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BirthdaySignUp = () => {
  const navigation = useNavigation();
  const [chosenDate, setChosenDate] = useState(new Date());

  return (
    <View>
      <Text>Step 2 of 4</Text>
      <Text>What's your birthday?</Text>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setChosenDate}
      ></DatePickerIOS>
      <Button
        title=" Sign Up"
        onPress={() => navigation.navigate("EmailSignUp")}
      ></Button>
    </View>
  );
};

export default BirthdaySignUp;
