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
import firebase from "../../firebase";
import {connect} from 'react-redux';

const EmailSignUp = ({currentUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = () => {
    currentUser.email = email;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const userID = result.user.uid;
        var item = {
          name: currentUser.name,
          email: email,
          //phoneNum: currentUser.phoneNum,
        };
        firebase
          .database()
          .ref("users/" + userID)
          .set(item);
        return result.user.updateProfile({
          displayName: currentUser.name,
        });
      })
      .then((result) => {
        navigation.navigate("DoneSignUp");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  return (
    <View>
      <Text>Step 3 of 4</Text>
      <Text>What's your email?</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        //style={styles.textInput}
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      <Text>Enter your password</Text>
      <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          // style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
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

export default connect(mapStateToProps)(EmailSignUp);

