import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";

function RoomPage({ route, navigation }) {
  const { roomId } = route.params;
  const [matches, setMatches] = useState([]);
  const [completed, setCompleted] = useState(false);

  // get matches if everyone has finished swiping
  useEffect(() => {
    const roomRef = firebase.database().ref("rooms/" + roomId);
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
  if (completed) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text>{roomId}</Text>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    );
    // else display a message that we're still waiting on others (an in-progress room)
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text>{roomId}</Text>
        <Text>Still waiting on people...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
});
export default RoomPage;
