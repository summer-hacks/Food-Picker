import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Slider } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NextButton from '../components/NextButton';
import Container from '../components/Container';
import StepSection from '../components/StepSection';
import DollarSigns from '../components/DollarSigns';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import * as Location from 'expo-location';
import {
  COLOR_PRIMARY,
  FONT_NORMAL,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
} from '../common';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const url = 'https://api.yelp.com/v3/businesses/search?';

const Search = ({ route, navigation }) => {
  // const { user } = route.params;
  const { partySize } = navigation.state.params;
  const { partyName } = navigation.state.params;

  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [maxRes, setMaxRes] = useState(0);
  const [dollars, setDollars] = useState([]);
  const [$clicked, set$] = useState(false);
  const [$$clicked, set$$] = useState(false);
  const [$$$clicked, set$$$] = useState(false);
  const [$$$$clicked, set$$$$] = useState(false);

  const getCurrLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      setLocation('Current Location');
    }
  };

  // helper functions to handle user input
  const onChangeLocation = (location) => {
    setLocation(location);
  };

  const onChangeRadius = (radius) => {
    setRadius(radius);
  };

  const onChangeMaxRes = (maxRes) => {
    setMaxRes(maxRes);
  };

  const handle$ = () => {
    Keyboard.dismiss();
    if ($clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 1));
    } else {
      setDollars((prev) => [...prev, 1]);
    }
    set$((prev) => !prev);
  };

  const handle$$ = () => {
    Keyboard.dismiss();
    if ($$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 2));
    } else {
      setDollars((prev) => [...prev, 2]);
    }
    set$$((prev) => !prev);
  };

  const handle$$$ = () => {
    Keyboard.dismiss();
    if ($$$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 3));
    } else {
      setDollars((prev) => [...prev, 3]);
    }
    set$$$((prev) => !prev);
  };

  const handle$$$$ = () => {
    Keyboard.dismiss();
    if ($$$$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 4));
    } else {
      setDollars((prev) => [...prev, 4]);
    }
    set$$$$((prev) => !prev);
  };

  // get restaurant data via Yelp API (this is passed to the CreateRoom component and then stored in firebase)
  // submitting blank form raises error
  const getData = async (
    location,
    longitude,
    latitude,
    radius,
    maxRes,
    dollars
  ) => {
    const prices = dollars.join(',');
    if (!location || !radius || !maxRes) {
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
      let full_url = '';
      if (location == 'Current Location') {
        full_url =
          url +
          `latitude=${latitude}&longitude=${longitude}&radius=${Math.round(
            radius * 1609.34
          )}&categories=restaurants&limit=${maxRes}&price=${prices}`;
      } else {
        full_url =
          url +
          `location=${location}&radius=${Math.round(
            radius * 1609.34
          )}&categories=restaurants&limit=${maxRes}&price=${prices}`;
      }

      const res = await fetch(full_url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + global.yelp_api_key,
        },
      });
      const resJson = await res.json();
      return resJson.businesses;
    }
  };

  let defaultLocation = '';

  if (longitude && latitude) {
    defaultLocation = 'Current Location';
  }

  const handleNext = async () => {
    const data = await getData(
      location,
      longitude,
      latitude,
      radius,
      maxRes,
      dollars
    );
    if (data !== undefined) {
      if (data.length === 0) {
        alert(
          'no restaurants found. please try searching again with different criteria.'
        );
      } else {
        navigation.navigate('CreateRoom', {
          restaurants: data,
          partySize: partySize,
          partyName: partyName,
        });
      }
    }
  };

  return (
    <Container>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title='Current Location'
        />
      </MapView>
      <StepSection>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.inline}>
            <TextInput
              placeholder='Search location'
              style={{ ...styles.textInput, width: '90%' }}
              onChangeText={onChangeLocation}
              defaultValue={defaultLocation}
              value={location}
            />
            <View style={styles.icon}>
              <Icon
                color={COLOR_PRIMARY}
                name='my-location'
                size={25}
                onPress={getCurrLocation}
              />
            </View>
          </View>
        </View>
        <View style={styles.inline}>
          <Text style={styles.label}>Max Distance</Text>
          <Text style={styles.label}>{radius} mi</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          minimumTrackTintColor={COLOR_PRIMARY}
          maximumTrackTintColor={COLOR_PRIMARY}
          onValueChange={onChangeRadius}
          step={0.5}
          thumbTintColor={COLOR_PRIMARY}
        />
        <View style={styles.inline}>
          <Text style={styles.label}>Max Option Count</Text>
          <Text style={styles.label}>{maxRes}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          minimumTrackTintColor={COLOR_PRIMARY}
          maximumTrackTintColor={COLOR_PRIMARY}
          onValueChange={onChangeMaxRes}
          step={1}
          thumbTintColor={COLOR_PRIMARY}
        />
        <DollarSigns
          $clicked={$clicked}
          $$clicked={$$clicked}
          $$$clicked={$$$clicked}
          $$$$clicked={$$$$clicked}
          handle$={handle$}
          handle$$={handle$$}
          handle$$$={handle$$$}
          handle$$$$={handle$$$$}
        />
      </StepSection>
      <View style={{ marginBottom: 30 }}></View>
      <NextButton onPress={handleNext} />
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: FONT_NORMAL,
    fontSize: hp('2.5%'),
    height: hp('3%'),
  },
  mapStyle: {
    width: '100%',
    height: hp('30%'),
    marginTop: -hp('10%'),
    marginBottom: hp('7%'),
  },
  icon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -hp('1.5%'),
  },
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: hp('2.5%'),
    borderBottomColor: '#000',
    marginBottom: hp('3%'),
    marginTop: hp('1%'),
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
  slider: {
    marginTop: hp('2%'),
    width: '100%',
    height: hp('7.5%'),
    alignSelf: 'center',
    marginBottom: hp('1%'),
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Search;
