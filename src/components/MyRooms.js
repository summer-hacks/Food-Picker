import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";

function MyRooms({ route, navigation }) {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
      const userRef = firebase.database().ref("users/" + currentUser.uid);
      userRef.once("value", async (snap) => {
        const promises = await Promise.all(
          snap.val().rooms.map(async (room) => {
            const roomRef = firebase.database().ref("rooms/" + room);
            let name = "";
            await roomRef.once("value", (snap) => {
              name = snap.val().partyName;
            });
            return { roomId: room, name: name };
          })
        );
        setRooms(promises);
      });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.roomId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("RoomPage", { room: item });
            }}
          >
            <Text style={styles.btnText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
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
export default MyRooms;
