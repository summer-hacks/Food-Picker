import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
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
  STEP_SUBSCRIPT_FONT_SIZE,
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
  BODY_FONT_SIZE,
  STEP_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from "../common";
import NextButton from "../components/NextButton";
import StepHeader from "../components/StepHeader";

const PartyInfo = ({ route, navigation }) => {
  const [partyName, setPartyName] = useState("");
  const [partySize, setPartySize] = useState(0);

  // extract data from route (variable name must equal whatever passed in)
  // const {user} = route.params

  // helper functions to handle user input
  const onChangePartySize = (partySize) => {
    setPartySize(partySize);
  };

  const onChangePartyName = (partyName) => {
    setPartyName(partyName);
  };

  const handleNext = () => {
    if (!partyName || !partySize) {
      Alert.alert(
        "Empty field",
        "Please enter all info",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.navigate("Search", {
        partyName: partyName,
        partySize: partySize,
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StepHeader step="Step 1 of 4" />
        <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
          <View style={styles.icon}>
            <Icon color="black" name="cake" size={25} />
          </View>
          <Text style={styles.normTxt}>Let's start your party!</Text>
        </View>

        <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
          <TextInput
            placeholder="Party Name"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={onChangePartyName}
            value={partyName}
          />
          <TextInput
            placeholder="Party Size"
            keyboardType={"numeric"}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={onChangePartySize}
            value={partySize}
          />
        </View>
        <NextButton onPress={handleNext} />
      </View>
    </TouchableWithoutFeedback>

    // <View style={styles.container}>
    //   <TextInput
    //     placeholder="Party Name"
    //     style={styles.input}
    //     onChangeText={onChangePartyName}
    //   />
    //   <TextInput
    //     placeholder="Party Size"
    //     keyboardType={"numeric"}
    //     style={styles.input}
    //     onChangeText={onChangePartySize}
    //   />

    //   <NextButton onPress={handleNext} />
    // </View>
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

export default PartyInfo;
