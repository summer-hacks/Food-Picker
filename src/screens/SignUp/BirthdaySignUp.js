import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  SECTION_HEIGHT,
  BODY_BOTTOM,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  BODY_FONT_SIZE,
  COLOR_SECONDARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
} from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";

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
    <View style={styles.container}>
      <StepHeader step="Step 2 of 4" subscript="(halfway there!)" />
      <StepTitleWithIcon
        title="What's your birthday?"
        iconName="cake-variant"
      />
      <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
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
      </View>

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
    </View>
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

export default connect(mapStateToProps)(BirthdaySignUp);
