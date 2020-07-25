import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
  BODY_FONT_SIZE,
  STEP_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from "../../common";
import NextButton from "../../components/NextButton";

const NameSignUp = ({ currentUser }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
  });
  const navigation = useNavigation();
  const handleLogin = () => {
    currentUser.name = userInfo.firstName + " " + userInfo.lastName;
    navigation.navigate("BirthdaySignUp");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ height: STEP_HEIGHT }}>
          <Text style={styles.step}>Step 1 of 4</Text>
        </View>

        <View style={{ bottom: HEADING_BOTTOM, height: SECTION_HEIGHT }}>
          <View style={styles.icon}>
            <Icon color="black" name="account-outline" size={25} />
          </View>
          <Text style={styles.normTxt}>What's your name?</Text>
        </View>

        <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            onChangeText={(firstName) =>
              setUserInfo({ ...userInfo, firstName: firstName })
            }
            value={userInfo.firstName}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Last Name"
            autoCapitalize="none"
            onChangeText={(lastName) =>
              setUserInfo({ ...userInfo, lastName: lastName })
            }
            value={userInfo.lastName}
            style={styles.textInput}
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
  textInput: {
    alignSelf: "stretch",
    fontFamily: "karla-regular",
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: "#000",
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
  },
  step: {
    alignSelf: "center",
    fontSize: STEP_FONT_SIZE,
    fontFamily: "karla-bold",
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(NameSignUp);
