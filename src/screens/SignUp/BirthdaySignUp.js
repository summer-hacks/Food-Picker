import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  BODY_FONT_SIZE,
  COLOR_SECONDARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  HEADING_BOTTOM,
  SECTION_HEIGHT,
  HEADING_PADDING_TOP,
  HEADING_FONT_SIZE,
  ICON_BORDER_WIDTH,
  COLOR_PRIMARY,
  ICON_BORDER_RADIUS,
  BODY_BOTTOM,
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
} from '../../common';
import StepHeader from '../../components/StepHeader';

const BirthdaySignUp = ({ currentUser }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const [color, setColor] = useState('#d3d3d3');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleLogin = () => {
    if (!date) {
      Alert.alert(
        'Empty field',
        'Please enter all info',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      currentUser.birthday = date;
      navigation.navigate('EmailSignUp');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StepHeader step='Step 2 of 4' subscript='(halfway there!)' />
        <View style={{ bottom: HEADING_BOTTOM, height: SECTION_HEIGHT }}>
          <View style={styles.icon}>
            <Icon color='black' name='cake-variant' size={25} />
          </View>
          <Text style={styles.normTxt}>What's your birthday?</Text>
        </View>

        <View style={{ bottom: BODY_BOTTOM + 30, height: SECTION_HEIGHT }}>
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
          mode='date'
          date={date}
          pickerContainerStyleIOS={{
            fontFamily: 'karla-bold',
          }}
          onConfirm={(date) => setDate(date)}
          onCancel={hideDatePicker}
          onChange={(date) => setDate(date)}
          customHeaderIOS={() => {
            return (
              <View
                style={{
                  padding: 16,
                  backgroundColor: global.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'black',
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
                  setColor('black');
                }}
                style={{
                  padding: 20,
                  backgroundColor: COLOR_SECONDARY,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20, color: 'black' }}>Confirm</Text>
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
              <Icon style={{ color: 'white' }} name='chevron-right' size={35} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
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
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(BirthdaySignUp);
