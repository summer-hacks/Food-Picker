import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../../firebase.js";
import Stack from "../components/Stack";
import Container from "../components/Container";
import StepHeader from "../components/StepHeader";
import BigHeader from "../components/BigHeader";

import {
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
  HEADING_BOTTOM,
} from "../common";

const Tinder = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const { roomId } = route.params;

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
    resRef.once("value", handleData, (error) => alert(error));
    return () => {
      resRef.off("value", handleData);
    };
  }, []);

  // function that handles the yes/no user choice for each restaurant
  const handleChoice = (choice, id, navigation) => {
    const resRef = firebase
      .database()
      .ref("rooms/" + roomId + "/restaurants/" + id);

    // increment relevant field in firebase to keep count of choices
    resRef.once("value", (snap) => {
      if (snap.exists()) {
        if (choice === "yes") {
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
      const roomRef = firebase.database().ref("rooms/" + roomId);
      roomRef.once("value", (snap) => {
        if (snap.exists()) {
          roomRef.update({
            numCompleted: ++snap.val().numCompleted,
          });
        }
      });
      navigation.navigate("MyRooms");
    }
  };

  return (
    <Container>
      <BigHeader title="Swipe Away!" />
      <StepHeader step={restaurants.length + " cards left"} />
      <Stack
        cards={restaurants}
        roomId={roomId}
        cb={handleChoice}
        nav={navigation}
      />
    </Container>
  );
};

export default Tinder;
