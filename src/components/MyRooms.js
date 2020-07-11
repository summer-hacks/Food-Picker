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
      console.log(currentUser);
      setUser(currentUser);
      const userRef = firebase.database().ref("users/" + currentUser.uid);
      userRef.once("value", (snap) => {
        setRooms(snap.val().rooms);
      });
    }
    // get the user's rooms
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("RoomPage", { roomId: item });
            }}
          >
            <Text style={styles.btnText}>{item}</Text>
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
