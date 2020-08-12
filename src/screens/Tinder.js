import React, { useEffect, useState } from "react";
import firebase from "../../firebase.js";
import Stack from "../components/Stack";
import Container from "../components/Container";
import StepHeader from "../components/StepHeader";
import BigHeader from "../components/BigHeader";
import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_TERTIARY, COLOR_SECONDARY, COLOR_PRIMARY } from '../common.js';

const Tinder = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { roomId } = navigation.state.params;
  
  // const animation duration for transition
  const ANIMATION_DURATION = 200;

  // get restaurant data from firebase for given room id (passed in from CreateRoom component)
  useEffect(() => {
    const resRef = firebase.database().ref("rooms/" + roomId + "/restaurants");
    const handleData = (snap) => {
      const restaurants = [];
      snap.forEach((res) => {
        restaurants.push(res.val());
      });

      if (restaurants) {
        setRestaurants(restaurants);
      }
    };

    // not sure what the purpose of the return is -- saw in tutorial
    resRef.once('value', handleData, (error) => alert(error));
    return () => {
      resRef.off('value', handleData);
    };
  }, []);

  return (
    <Container>
      <BigHeader title='Swipe Away!' />
      <Stack cards={restaurants} roomId={roomId} nav={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#161a7e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 0.1,
    alignSelf: 'center',
  },
  swiperContainer: {
    flex: 0.75,
  },
  bottomContainer: {
    flex: 0.15,
    top: heightPercentageToDP('12%'),
    justifyContent: 'space-evenly',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Tinder;
