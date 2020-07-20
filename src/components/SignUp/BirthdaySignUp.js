import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { COLOR_PRIMARY, STEP_HEIGHT, HEADING_BOTTOM, SECTION_HEIGHT, BODY_BOTTOM, TEXTINPUT_BOTTOM_BORDER_WIDTH, BODY_FONT_SIZE, COLOR_SECONDARY, NEXT_BUTTON_LEFT, NEXT_BUTTON_BOTTOM, ICON_BORDER_WIDTH, HEADING_FONT_SIZE, HEADING_PADDING_TOP, STEP_FONT_SIZE, STEP_SUBSCRIPT_FONT_SIZE, ICON_BORDER_RADIUS, CONTAINER_PADDING_LEFT, CONTAINER_PADDING_RIGHT } from '../../common';

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

      <View style={{ height: STEP_HEIGHT }}>
        <Text style={styles.step}>Step 2 of 4</Text>
        <Text style={styles.stepSubscript}>(halfway there!)</Text>
      </View>

      <View style={{ bottom: HEADING_BOTTOM, height: SECTION_HEIGHT }}>
        <View style={styles.icon}>
          <Icon color="black" name="cake-variant" size={25} />
        </View>
        <Text style={styles.normTxt}>What's your birthday?</Text>
      </View>


      <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
        <TouchableOpacity
          style={{
            position: 'relative',
            borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
            width: '95%',
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
                alignItems: 'center',
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
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: "white" }} name="chevron-right" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
  },
  buttonView: {
    alignSelf: 'flex-end',
    left: NEXT_BUTTON_LEFT,
    bottom: NEXT_BUTTON_BOTTOM,
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP
  },
  step: {
    alignSelf: 'center',
    fontSize: STEP_FONT_SIZE,
    fontFamily: 'karla-bold',
  },
  stepSubscript: {
    alignSelf: 'center',
    fontSize: STEP_SUBSCRIPT_FONT_SIZE,
    fontFamily: 'karla-bold',
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderWidth: ICON_BORDER_WIDTH,
    borderColor: COLOR_PRIMARY,
    borderRadius: ICON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(BirthdaySignUp);
