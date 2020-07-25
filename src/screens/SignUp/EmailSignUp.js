import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../../firebase";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BODY_FONT_SIZE, TEXTINPUT_BOTTOM_BORDER_WIDTH } from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";
import Container from "../../components/Container";
import StepSection from "../../components/StepSection";

const EmailSignUp = ({ currentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

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
        navigation.navigate("LocationSignUp");
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <Container>
      <StepHeader step="Step 3 of 4" subscript="(almost there!)" />
      <StepTitleWithIcon title="What's your email?" iconName="email-outline" />
      <StepSection>
        {errorMessage && (
          <View style={{ bottom: hp("1%"), paddingLeft: 3, height: hp("3%") }}>
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          </View>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        {/* <Text>Enter your password</Text> */}
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </StepSection>
      <NextButton onPress={handleLogin} />
    </Container>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: "stretch",
    fontFamily: "karla-regular",
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: "#000",
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(EmailSignUp);
