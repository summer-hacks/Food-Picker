import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "../../../firebase";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BODY_BOTTOM,
  COLOR_PRIMARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  SECTION_HEIGHT,
  HEADING_BOTTOM,
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  BODY_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StepHeader step="Step 3 of 4" subscript="(almost there!)" />
        <StepTitleWithIcon
          title="What's your email?"
          iconName="email-outline"
        />
        <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
          {errorMessage && (
            <View
              style={{ bottom: hp("1%"), paddingLeft: 3, height: hp("3%") }}
            >
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
        </View>
        <NextButton onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
  },
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
