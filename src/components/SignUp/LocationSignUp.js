import React, { useState, useEffect } from "react";
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLOR_PRIMARY, DEVICE_WIDTH, DEVICE_HEIGHT, STEP_HEIGHT, ICON_BORDER_WIDTH, ICON_BORDER_RADIUS, STEP_SUBSCRIPT_FONT_SIZE, STEP_FONT_SIZE, HEADING_FONT_SIZE, HEADING_PADDING_TOP, NEXT_BUTTON_LEFT, NEXT_BUTTON_BOTTOM, CONTAINER_PADDING_LEFT, CONTAINER_PADDING_RIGHT, HEADING_BOTTOM, SECTION_HEIGHT, BODY_BOTTOM } from '../../common';

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
        // alert(JSON.stringify(position));
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
    currentUser.location = currentPosition;
    navigation.navigate("DoneSignUp");
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

      <View style={{ height: STEP_HEIGHT }}>
        <Text style={styles.step}>Step 4 of 4</Text>
        <Text style={styles.stepSubscript}>(last step!)</Text>
      </View>

      <View style={{ bottom: HEADING_BOTTOM, height: SECTION_HEIGHT }}>
        <View style={styles.icon}>
          <Icon color="black" name="map-marker-outline" size={25} />
        </View>
        <Text style={styles.normTxt}>Where do you live?</Text>
      </View>

      <View style={{ bottom: BODY_BOTTOM + 35, height: SECTION_HEIGHT }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            alignSelf: 'center',
            width: wp('80%'),
            height: hp('30%'),
            borderRadius: 5,
          }}
          initialRegion={currentPosition}
          showsUserLocation
        ></MapView>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Icon style={{ color: "white" }} name="chevron-right" size={35} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
      <ActivityIndicator style={{ flex: 1 }} animating size="large" />
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
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(LocationSignUp);
