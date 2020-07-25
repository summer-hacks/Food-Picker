import React from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLOR_SECONDARY,
  COLOR_PRIMARY,
  BODY_BOTTOM,
  FONT_NORMAL,
} from "../../common";

import ContainerWithBottomButton from "../../components/ContainerWithBottomButton";

const StartSignUp = ({ clearCurrentUser }) => {
  clearCurrentUser();
  const navigation = useNavigation();

  return (
    <ContainerWithBottomButton
      bottomText="Sign Up"
      bottomOnPress={() => {
        navigation.navigate("NameSignUp");
      }}
    >
      <Text style={[styles.normTxt, { bottom: BODY_BOTTOM }]}>
        Looks like you're{" "}
        <Text style={[{ fontFamily: FONT_NORMAL, color: COLOR_PRIMARY }]}>
          new.
        </Text>
      </Text>
      <Text style={styles.normTxt}>
        Make an account to start a <Text style={styles.normTxt}>party!</Text>
      </Text>
    </ContainerWithBottomButton>
  );
};

const styles = StyleSheet.create({
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: 40,
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSignUp);
