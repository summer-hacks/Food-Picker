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


const DoneSignUp = ({currentUser}) => {
  console.log('done', currentUser);

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

function mapStateToProps(state) {
  return {
      currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(DoneSignUp);


// export default DoneSignUp;
