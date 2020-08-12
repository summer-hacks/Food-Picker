import React, { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
  BODY_BOTTOM,
  COLOR_PRIMARY,
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  SECTION_HEIGHT,
  HEADING_BOTTOM,
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  NEXT_BUTTON_BOTTOM,
  NEXT_BUTTON_LEFT,
  BODY_FONT_SIZE,
  STEP_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  ICON_BORDER_WIDTH,
} from '../../common';

const NameSignUp = ({ currentUser }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  });
  const navigation = useNavigation();
  const handleLogin = () => {
    if (!userInfo.firstName || !userInfo.lastName) {
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
      currentUser.name = userInfo.firstName + ' ' + userInfo.lastName;
      navigation.navigate('BirthdaySignUp');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StepHeader step='Step 1 of 4' subscript='(4 simple steps!)' />

        <View style={{ bottom: HEADING_BOTTOM, height: SECTION_HEIGHT }}>
          <View style={styles.icon}>
            <Icon color='black' name='account-outline' size={25} />
          </View>
          <Text style={styles.normTxt}>What's your name?</Text>
        </View>

        <View style={{ bottom: BODY_BOTTOM + 30, height: SECTION_HEIGHT }}>
          <TextInput
            placeholder='First Name'
            autoCapitalize='none'
            onChangeText={(firstName) =>
              setUserInfo({ ...userInfo, firstName: firstName })
            }
            value={userInfo.firstName}
            style={styles.textInput}
          />
          <TextInput
            placeholder='Last Name'
            autoCapitalize='none'
            onChangeText={(lastName) =>
              setUserInfo({ ...userInfo, lastName: lastName })
            }
            value={userInfo.lastName}
            style={styles.textInput}
          />
        </View>

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
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
  },
  step: {
    alignSelf: 'center',
    fontSize: STEP_FONT_SIZE,
    fontFamily: 'karla-bold',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(NameSignUp);
