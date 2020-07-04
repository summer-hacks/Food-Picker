import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Overlay } from "react-native-elements";

import firebase from "../firebase.js";

const CardDetail = ({ route, navigation }) => {
  const { resId } = route.params;
  const { roomId } = route.params;
  const [restaurant, setRestaurant] = useState({});
  useEffect(() => {
    const resRef = firebase
      .database()
      .ref(`rooms/${roomId}/restaurants/${resId}`);
    resRef.once(
      "value",
      (snap) => {
        setRestaurant(snap.val());
      },
      (error) => alert(error)
    );
  }, []);
  return (
    <View style={styles.bigContainer}>
      <Text>{restaurant.name}</Text>
      <Image
        style={{ width: 350, height: 300 }}
        source={{
          uri: restaurant.image_url,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CardDetail;
