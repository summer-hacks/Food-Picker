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
  BODY_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
} from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";
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
        <StepHeader step="Step 1 of 4" />
        <StepTitleWithIcon
          title="What's your name?"
          iconName="account-outline"
        />
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

export default connect(mapStateToProps)(NameSignUp);
