import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmailSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNum: '',
    errorMessage: null,
  });
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 3 of 4</Text>
      <Text style={styles.stepSubscript}>(almost there. . .)</Text>
      <View>
        <View style={styles.icon}>
          <Icon color='black' name='email-outline' size={25} />
        </View>
      </View>
      <Text style={styles.normTxt}>What's your email?</Text>
      <TextInput
        placeholder='Email'
        autoCapitalize='none'
        style={styles.textInput}
        onChangeText={(email) => setUserInfo({ ...userInfo, email: email })}
        value={userInfo.email}
      />
      <View style={styles.buttonView}>
        {/* <TouchableOpacity onPress={handleLogin}> */}
        <TouchableOpacity onPress={() => navigation.navigate('LocationSignUp')}>
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
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  buttonView: {
    alignSelf: 'flex-end',
    marginRight: '-10%',
    marginBottom: '10%',
  },
  button: {
    width: 54,
    height: 54,
    backgroundColor: global.orange,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: 40,
    bottom: '15%',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 5,
    fontFamily: 'karla-regular',
    fontSize: 35,
    borderBottomColor: '#000',
    margin: 5,
    marginBottom: 20,
    borderBottomWidth: 3,
    bottom: '20%',
  },
  step: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'karla-bold',
    marginTop: '0%',
  },
  stepSubscript: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'karla-bold',
    position: 'absolute',
    marginTop: '10%',
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
    top: '-100%',
  },
});

export default EmailSignUp;