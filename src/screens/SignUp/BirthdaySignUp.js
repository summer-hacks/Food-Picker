import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  BODY_FONT_SIZE,
  COLOR_SECONDARY,
} from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";
import Container from "../../components/Container";
import StepSection from "../../components/StepSection";

const BirthdaySignUp = ({ currentUser }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [color, setColor] = useState("#d3d3d3");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleLogin = () => {
    currentUser.birthday = date;
    navigation.navigate("EmailSignUp");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
    setDate(date);
    setColor("black");
  };

  return (
    <Container>
      <StepHeader step="Step 2 of 4" subscript="(halfway there!)" />
      <StepTitleWithIcon
        title="What's your birthday?"
        iconName="cake-variant"
      />
      <StepSection>
        <TouchableOpacity
          style={{
            position: "relative",
            borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
            width: "95%",
          }}
          onPress={showDatePicker}
        >
          <Text
            style={{
              fontSize: BODY_FONT_SIZE,
              color: color,
            }}
          >
            {date.toDateString().substring(4)}
          </Text>
        </TouchableOpacity>
      </StepSection>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        pickerContainerStyleIOS={{
          fontFamily: "karla-bold",
        }}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onChange={(date) => setDate(date)}
        customHeaderIOS={() => {
          return (
            <View
              style={{
                padding: 16,
                backgroundColor: global.yellow,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 22,
                }}
              >
                Choose your birthday
              </Text>
            </View>
          );
        }}
        customConfirmButtonIOS={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisibility(false);
                setColor("black");
              }}
              style={{
                padding: 20,
                backgroundColor: COLOR_SECONDARY,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>Confirm</Text>
            </TouchableOpacity>
          );
        }}
        customCancelButtonIOS={() => {
          return <View></View>;
        }}
      />
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

export default connect(mapStateToProps)(BirthdaySignUp);
