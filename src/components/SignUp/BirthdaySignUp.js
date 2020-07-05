import React, { useState } from "react";
import { StyleSheet, Text, View, Button, DatePickerIOS } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import {connect} from 'react-redux';

const BirthdaySignUp = ({currentUser}) => {
  const navigation = useNavigation();
  const [chosenDate, setChosenDate] = useState(new Date());
  const handleLogin = () => {
    currentUser.birthday = chosenDate;
    navigation.navigate("LocationSignUp");
  };

  return (
    <View>
      <Text>Step 2 of 4</Text>
      <Text>What's your birthday?</Text>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setChosenDate}
      ></DatePickerIOS>
      <Button
        title="Sign Up"
        onPress={handleLogin}
      ></Button>
    </View>
  );
};

function mapStateToProps(state) {
  return {
      currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BirthdaySignUp);

