import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import MapView, { AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { COLOR_PRIMARY, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../common';

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const LocationSignUp = ({ currentUser }) => {
  const [currentPosition, setCurrentPosition] = useState(initialState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(JSON.stringify(position));
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleLogin = () => {
    currentUser.location = location;
    navigation.navigate('EmailSignUp');
  };

  // async function getCurrentLocation() {
  //   const { status, permissions } = await Permissions.askAsync(
  //     Permissions.LOCATION
  //   );
  //   if (status === 'granted') {
  //     console.log('GRANTED');
  //     const myLocation = await Location.getCurrentPositionAsync();
  //     setLocation(myLocation);
  //   } else {
  //     throw new Error('Location permission not granted');
  //   }
  // }

  const navigation = useNavigation();
  return currentPosition.latitude ? (
    <View style={styles.container}>
      <Text style={styles.step}>Step 4 of 4</Text>
      <Text style={styles.stepSubscript}>(last step!)</Text>

      <View>
        <View style={styles.icon}>
          <Icon color='black' name='map-marker-outline' size={25} />
        </View>
      </View>
      <Text style={styles.normTxt}>Where do you live?</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          alignSelf: 'center',
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT * 0.4,
        }}
        initialRegion={currentPosition}
        showsUserLocation
      ></MapView>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: 'white' }} name='chevron-right' size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
      <ActivityIndicator style={{ flex: 1 }} animating size='large' />
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
    backgroundColor: COLOR_PRIMARY,
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
    borderColor: COLOR_PRIMARY,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: '-100%',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(LocationSignUp);
