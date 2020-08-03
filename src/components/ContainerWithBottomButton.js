import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CONTAINER_PADDING_LEFT, CONTAINER_PADDING_RIGHT } from "../common";
import BottomButton from "./BottomButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContainerWithBottomButton = ({ children, bottomText, bottomOnPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.bigContainer}>
        <View style={styles.container}>{children}</View>
        <BottomButton text={bottomText} onPress={bottomOnPress} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
    marginTop: hp("10%"),
    marginBottom: hp("30%"),
  },
});

export default ContainerWithBottomButton;
