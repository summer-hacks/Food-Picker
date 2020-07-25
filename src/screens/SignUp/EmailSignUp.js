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
  STEP_HEIGHT,
  STEP_SUBSCRIPT_FONT_SIZE,
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
  BODY_FONT_SIZE,
  STEP_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from "../../common";
import NextButton from "../../components/NextButton";

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
        <View style={{ height: STEP_HEIGHT }}>
          <Text style={styles.step}>Step 3 of 4</Text>
          <Text style={styles.stepSubscript}>(almost there!)</Text>
        </View>

        <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
          <View style={styles.icon}>
            <Icon color="black" name="email-outline" size={25} />
          </View>
          <Text style={styles.normTxt}>What's your email?</Text>
        </View>

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
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
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
  step: {
    alignSelf: "center",
    fontSize: STEP_FONT_SIZE,
    fontFamily: "karla-bold",
  },
  stepSubscript: {
    alignSelf: "center",
    fontSize: STEP_SUBSCRIPT_FONT_SIZE,
    fontFamily: "karla-bold",
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderWidth: ICON_BORDER_WIDTH,
    borderColor: COLOR_PRIMARY,
    borderRadius: ICON_BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(EmailSignUp);