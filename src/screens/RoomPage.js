import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import firebase from "../../firebase.js";
import Container from "../components/Container";
import BigHeader from "../components/BigHeader";
import StepHeader from "../components/StepHeader";
import { FONT_NORMAL, COLOR_PRIMARY } from "../common.js";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function RoomPage({ route, navigation }) {
  const { room } = route.params;
  const [matches, setMatches] = useState([]);
  const [completed, setCompleted] = useState(false);

  // get matches if everyone has finished swiping
  useEffect(() => {
    console.log(room);
    const roomRef = firebase.database().ref("rooms/" + room.roomId);
    roomRef.once("value", (snap) => {
      const room = snap.val();
      if (room.numCompleted === room.partySize) {
        setCompleted(true);
        const restaurants = [];
        Object.keys(room.restaurants).forEach((key) => {
          restaurants.push(room.restaurants[key]);
        });
        const matches = restaurants.filter((res) => res.yes === room.partySize);
        setMatches(matches);
      }
    });
  }, []);

  // displays matches in a list if all users have finished swiping (a completed room)
  return (
    <Container>
      <BigHeader title={room.name} />
      {/* <StepHeader step={room.roomId} /> */}
      {completed ? (
        <StepHeader step="Here are your matches!" />
      ) : (
        <StepHeader step="Still waiting on people..." />
      )}
      {completed ? (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.inline}>
              <Icon
                color={COLOR_PRIMARY}
                name="heart"
                size={heightPercentageToDP(1.5)}
                style={{
                  marginRight: widthPercentageToDP(3),
                  marginBottom: heightPercentageToDP(4),
                }}
              />
              <Text style={styles.txt}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.txt}></Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: FONT_NORMAL,
    fontSize: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(4),
  },
  inline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
  },
});
export default RoomPage;
