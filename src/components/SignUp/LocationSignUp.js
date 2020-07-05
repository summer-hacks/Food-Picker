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
import {connect} from 'react-redux';

const LocationSignUp = ({currentUser}) => {
  const [location, setLocation] = useState('');
  const handleLogin = () => {
    currentUser.location = location;
    navigation.navigate("EmailSignUp");
  };
  const navigation = useNavigation();
  return (
    <View>
      <Text>Step 3 of 4</Text>
      <Text>Where do you live?</Text>
      {/* Map??? lol */}
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


export default connect(mapStateToProps)(LocationSignUp);

