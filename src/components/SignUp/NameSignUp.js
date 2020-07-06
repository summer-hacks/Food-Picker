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
import {connect} from 'react-redux';

const NameSignUp = ({currentUser}) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: ''
  });
  const navigation = useNavigation();
  const handleLogin = () => {
    currentUser.name = userInfo.firstName + ' ' + userInfo.lastName;
    navigation.navigate("BirthdaySignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1 of 4</Text>
      <View>
        <View style={styles.icon}>
          <Icon color="black" name="account-outline" size={25} />
        </View>
      </View>
      <Text style={styles.normTxt}>What's your name?</Text>
      <TextInput
        placeholder="First Name"
        autoCapitalize="none"
        onChangeText={(firstName) =>
          setUserInfo({ ...userInfo, firstName: firstName })
        }
        value={userInfo.firstName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Last Name"
        autoCapitalize="none"
        onChangeText={(lastName) =>
          setUserInfo({ ...userInfo, lastName: lastName })
        }
        value={userInfo.lastName}
        style={styles.textInput}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: "white" }} name="chevron-right" size={35} />
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
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: global.orange,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
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
    bottom: '15%',
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: 40,
    marginBottom: '40%',
  },
  step: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'karla-bold',
    marginTop: '5%',
  },
});

function mapStateToProps(state) {
  return {
      currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NameSignUp);
