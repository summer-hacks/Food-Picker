import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "../../firebase.js";

// checks if room exists & is not yet full -- increments number of users joined if both conditions satisfied
function joinRoom(roomId, navigation, user) {
  firebase
    .database()
    .ref("rooms/" + roomId)
    .once("value", (snap) => {
      // check if room exists
      if (snap.exists()) {
        // check if room is full
        if (snap.val().numJoined < snap.val().partySize) {
          const userRef = firebase.database().ref("users/" + user.uid);
          userRef.once(
            "value",
            (snap) => {
              console.log(snap.val());
              // check if user already in room
              if (snap.val().rooms) {
                if (snap.val().rooms.includes(roomId)) {
                  alert("already in room");
                } else {
                  // add room to user's collection
                  userRef.update({
                    rooms: [...snap.val().rooms, roomId],
                  });
                }
              } else {
                userRef.update({
                  rooms: [roomId],
                });
              }

              // update num joined for room
              const roomRef = firebase.database().ref("rooms/" + roomId);

              roomRef.once("value", (snap) => {
                roomRef.update({
                  numJoined: ++snap.val().numJoined,
                });
              });

              navigation.navigate("Tinder", {
                roomId: roomId,
              });
            },
            (error) => alert(error)
          );
        } else {
          alert("full room");
        }
      } else {
        alert("nonexisting room");
      }
    });
}

const JoinRoom = ({ route, navigation }) => {
  const [roomId, setRoomId] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const onChangeRoomId = (roomId) => {
    setRoomId(parseInt(roomId));
  };

  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Room Id"
        style={styles.input}
        keyboardType={"numeric"}
        onChangeText={onChangeRoomId}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => joinRoom(roomId, navigation, user)}
      >
        <Text style={styles.btnText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
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

export default JoinRoom;
