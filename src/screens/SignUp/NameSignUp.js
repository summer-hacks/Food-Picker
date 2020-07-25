import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { BODY_FONT_SIZE, TEXTINPUT_BOTTOM_BORDER_WIDTH } from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepSection from "../../components/StepSection";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";
import Container from "../../components/Container";

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
    <Container>
      <StepHeader step="Step 1 of 4" />
      <StepTitleWithIcon title="What's your name?" iconName="account-outline" />
      <StepSection>
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

export default connect(mapStateToProps)(NameSignUp);
