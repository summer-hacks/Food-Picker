import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

export const MyTextInput = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  });

  return (
    <View style={styles.container}>
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
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(MyTextInput);
