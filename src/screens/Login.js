import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from '../../firebase';
import {
  BODY_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  COLOR_TERTIARY_DARK,
  COLOR_PRIMARY,
} from '../common';
import { useNavigation } from '@react-navigation/native';
import './../../global';
import { connect } from 'react-redux';
import Container from '../components/Container';
import NextButton from '../components/NextButton';
import StepTitleWithIcon from '../components/StepTitleWithIcon';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';

const Login = ({ currentUser, actions }) => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    const email = userInfo.email;
    const password = userInfo.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch((error) => setErrorMessage(error.message));
  };
  return (
    <Container>
      <StepHeader mb={hp('10%')} />
      <StepTitleWithIcon title="It's Chikin Tinder Time!" iconName='food' />
      <Text style={{ fontFamily: 'karla-bold', fontSize: 40 }}></Text>
      <StepSection>
        {errorMessage && (
          <View style={{ bottom: hp('1%'), paddingLeft: 3, height: hp('3%') }}>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          </View>
        )}
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
      </StepSection>
      <View style={{ bottom: hp('8.5%'), flexDirection: 'row' }}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StartSignUp')}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <NextButton onPress={handleLogin} />
    </Container>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 25,
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
  signUpText: {
    marginLeft: 7,
    color: COLOR_TERTIARY_DARK,
    fontSize: 18,
    fontWeight: '500',
  },
  signUp: {
    marginLeft: 7,
    color: COLOR_PRIMARY,
    fontSize: 18,
    fontWeight: '500',
    // textDecorationLine: "underline",
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Login);
