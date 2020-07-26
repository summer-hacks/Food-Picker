import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../../firebase.js';
import Stack from './Stack';
import Swiper from 'react-native-deck-swiper';
import Card from "./Card";

const Tinder = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const { roomId } = route.params;

  // get restaurant data from firebase for given room id (passed in from CreateRoom component)
  useEffect(() => {
    const resRef = firebase.database().ref('rooms/' + roomId + '/restaurants');
    console.log(resRef)
    const handleData = (snap) => {
      const restaurants = [];
      snap.forEach((res) => {
        restaurants.push(res.val());
      });

      if (restaurants) {
        setRestaurants(restaurants);
      }
      setRestaurants(restaurants)
    };

    // not sure what the purpose of the return is -- saw in tutorial
    resRef.once('value', handleData, (error) => alert(error));
    return () => {
      resRef.off('value', handleData);
    };
  }, []);


  // function that handles the yes/no user choice for each restaurant
  const handleChoice = (choice, id, navigation) => {
    const resRef = firebase
      .database()
      .ref('rooms/' + roomId + '/restaurants/' + id);

    // increment relevant field in firebase to keep count of choices
    resRef.once('value', (snap) => {
      if (snap.exists()) {
        if (choice === 'yes') {
          resRef.update({
            yes: ++snap.val().yes,
          });
        } else {
          resRef.update({
            no: ++snap.val().no,
          });
        }
      }
    });

    // remove restaurant from display list
    setRestaurants((prev) => prev.filter((res) => res.id !== id));

    // if no more restaurants left, update number of users completed for that room
    if (restaurants.length === 1) {
      const roomRef = firebase.database().ref('rooms/' + roomId);
      roomRef.once('value', (snap) => {
        if (snap.exists()) {
          roomRef.update({
            numCompleted: ++snap.val().numCompleted,
          });
        }
      });
      navigation.navigate('MyRooms');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tinder Screen</Text>
      <Text>roomId: {roomId}</Text>
      <Text>{restaurants.length} remaining</Text>
      {/* <Stack
        cards={restaurants}
        roomId={roomId}
        cb={handleChoice}
        nav={navigation}
      /> */}
      <Swiper
        cards={restaurants}
        cardIndex={cardIndex}
        renderCard={card => {
          if (card) {
            console.log(card)
            return (
              <View style={styles.card}>
                <Text>{card.name}</Text>
              </View>)
          }
          // else {
          //   console.log(card);
          //   return (
          //     <View style={styles.fakeCard}>
          //       <Text>hey, card is undefined</Text>
          //     </View>)
          // }
        }}


      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: 'white'
  },
  fakeCard: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
});

export default Tinder;
