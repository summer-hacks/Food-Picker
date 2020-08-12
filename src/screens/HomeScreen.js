import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5} from "@expo/vector-icons";
import firebase from '../../firebase.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
  COLOR_SECONDARY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_LIGHT,
} from '../common.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// main menu assuming the user has already logged in
function HomeScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [meal, setMeal] = useState('');
  var hours = new Date().getHours();

  useEffect(() => {
    // returns a user object from firebase authentication
    // access user data in real-time database with a reference to users/currentUser.uid
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
      setFirstName(currentUser.displayName.split(' ')[0]);
    }

    if (hours >= 5 && hours < 12) {
      setMeal('breakfast');
    } else if (hours >= 12 && hours < 6) {
      setMeal('lunch');
    } else if (hours >= 6 && hours < 9) {
      setMeal('dinner');
    } else {
      setMeal('a late night snack');
    }
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  };

  return (
    <View style={styles.container}>
      <Text
        style={[{ alignSelf: 'flex-start', marginTop: hp(10) }, styles.normTxt]}
      >
        Hello {'\n'}
        <Text style={styles.shadowTxt}>{firstName}!</Text>
      </Text>
      <Text style={{ color: COLOR_PRIMARY, fontSize: 28, bottom: 25 }}>
        What's for {meal}?
      </Text>
      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: COLOR_PRIMARY_LIGHT }]}
            onPress={() => navigation.navigate('PartyInfo')}
          >
            <View style={styles.menuBoxContent}>
              <Icon
                color='white'
                name='account-group-outline'
                size={24}
                style={styles.icon}
              />
              <Text style={[styles.btnTxt, { color: 'white' }]}>
                Start a {'\n'}Party
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: COLOR_SECONDARY }]}
            onPress={() => navigation.navigate('PartyInfo')}
          >
            <View style={styles.menuBoxContent}>
              <Icon
                color='black'
                name='silverware'
                size={24}
                style={styles.icon}
              />
              <Text style={styles.btnTxt}>View Restaurants</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: COLOR_SECONDARY }]}
            onPress={() => navigation.navigate('JoinRoom')}
          >
            <View style={styles.menuBoxContent}>
              <Icon color='black' name='plus' size={24} style={styles.icon} />
              <Text style={[styles.btnTxt, { color: 'black' }]}>
                Join a {'\n'}Party
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: COLOR_PRIMARY_LIGHT }]}
            onPress={() => navigation.navigate('MyRooms')}
          >
            <View style={styles.menuBoxContent}>
              <Icon
                color='white'
                name='eye-outline'
                size={24}
                style={styles.icon}
              />
              <Text style={[styles.btnTxt, { color: 'white' }]}>
                View {'\n'}Rooms
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={() => signOut()} title='Sign Out'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',

    height: hp('17%'),
    width: wp('37%'),
    borderRadius: 20,
    margin: 5,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnTxt: {
    fontFamily: 'karla-bold',
    fontSize: 20,
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: 45,
  },
  shadowTxt: {
    fontFamily: 'karla-regular',
    fontSize: 48,
    backgroundColor: COLOR_SECONDARY,
  },
  icon: {
    marginLeft: 100,
    marginBottom: 35,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('8%'),
  },
  menuRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuBoxContent: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default HomeScreen;
