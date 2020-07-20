import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import firebase from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import './../../global';
import { connect } from 'react-redux';
import { COLOR_PRIMARY, COLOR_TERTIARY, COLOR_TERTIARY_DARK } from '../common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = ({ currentUser, actions }) => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    errorMessage: null,
  });

  const handleLogin = () => {
    const email = userInfo.email;
    const password = userInfo.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch((error) => setUserInfo({ ...userInfo, errorMessage: error }));
  };

  // phone number confirmation code but i don't think it works for our app

  // async function signIn() {
  //   const confirmation = await firebase.auth().signInWithPhoneNumber(userPhoneNum);
  //   setConfirm(confirmation);
  // }

  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  // const setUpRecaptcha = () => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': function(response) {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       onSignInSubmit();
  //     }
  //   });
  // };

  // const onSignInSubmit = () => {
  //   // var phoneNumber = getPhoneNumberFromUserInput();
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': function(response) {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       onSignInSubmit();
  //     }
  //   });

  //   var phoneNumber = '+15629913412';
  //   var appVerifier = window.recaptchaVerifier;
  //   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  //       .then(function (confirmationResult) {
  //         var code = getCodeFromUserInput();
  //         confirmationResult.confirm(code).then(function (result) {
  //           // User signed in successfully
  //           var user = result.user;
  //           // ...
  //           console.log("User is signed in")
  //         }).catch(function (error) {
  //           // User couldn't sign in (bad verification code?)
  //           // ...
  //         });
  //         // SMS sent. Prompt user to type the code from the message, then sign the
  //         // user in with confirmationResult.confirm(code).
  //         window.confirmationResult = confirmationResult;
  //       }).catch(function (error) {
  //         // Error; SMS not sent
  //         // ...
  //       });
  // };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.icon}>
          <Icon color='black' name='phone-outline' size={25} />
        </View>
      </View>
      <Text style={{ fontFamily: 'karla-bold', fontSize: 40 }}>
        What's your {'\n'}phone number?
      </Text>
      {userInfo.errorMessage && (
        <Text style={{ color: 'red' }}>{userInfo.errorMessage}</Text>
      )}
      <View>
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Email'
          onChangeText={(email) => setUserInfo({ ...userInfo, email: email })}
          value={userInfo.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Password'
          onChangeText={(password) =>
            setUserInfo({ ...userInfo, password: password })
          }
          value={userInfo.password}
        />
      </View>
      <TouchableOpacity
        style={{ bottom: hp('10%') }}
        onPress={() => navigation.navigate('StartSignUp')}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      {/* 
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate("StartSignUp")}
      /> */}
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: 'white' }} name='chevron-right' size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingLeft: 30,
  },
  buttonView: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: global.orange,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: global.orange,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: '100%',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 5,
    fontFamily: 'karla-bold',
    fontSize: 35,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 20,
    width: deviceWidth * 0.75,
    borderBottomWidth: 3,
    bottom: '15%',
  },
  signUpText: {
    marginLeft: 7,
    color: COLOR_TERTIARY_DARK,
    fontSize: 18,
    fontWeight: '500',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Login);
