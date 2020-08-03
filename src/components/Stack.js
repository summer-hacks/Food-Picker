import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Stack = ({ cards, roomId, cb, nav }) => {
  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <Card
          key={card.id}
          roomId={roomId}
          restaurant={card}
          handleChoice={cb}
          navigation={nav}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -hp("10%"),
  },
});

export default Stack;
