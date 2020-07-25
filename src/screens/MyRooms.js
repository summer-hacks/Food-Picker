import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";
import { COLOR_PRIMARY, BORDER_RADIUS, DEVICE_WIDTH } from "../common";

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
            let size = 0;
            let completed = 0;
            await roomRef.once("value", (snap) => {
              const res = snap.val();
              name = res.partyName;
              size = res.partySize;
              completed = res.numCompleted;
            });
            return {
              roomId: room,
              name: name,
              size: size,
              completed: completed,
            };
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
            <Text style={styles.btnText}>
              {item.completed}/{item.size}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR_PRIMARY,
    padding: 9,
    margin: 5,
    borderRadius: 10,
    width: 0.75 * DEVICE_WIDTH,
    height: 75,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginRight: 10,
    marginLeft: 10,
    alignSelf: "center",
  },
});
export default MyRooms;
