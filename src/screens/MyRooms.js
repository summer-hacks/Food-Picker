import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";
import { COLOR_PRIMARY_LIGHT, COLOR_SECONDARY, FONT_NORMAL } from "../common";
import Container from "../components/Container";
import BigHeader from "../components/BigHeader";
import { NavigationActions } from 'react-navigation';

import { heightPercentageToDP } from "react-native-responsive-screen";
function MyRooms({ route, navigation }) {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  // const resetAction = NavigationActions.reset({
  //   index: 1,
  //   actions: [
  //     NavigationActions.navigate({
  //       routeName: 'HomeStack'
  //     }),
  //     NavigationActions.navigate({
  //       routeName: 'MyRooms'
  //     })
  //   ]
  // });

  // navigation.dispatch(resetAction);

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
    <Container>
      <BigHeader title="My Rooms" />
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.roomId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={
              item.completed === item.size
                ? { ...styles.btn, backgroundColor: COLOR_PRIMARY_LIGHT }
                : { ...styles.btn, backgroundColor: COLOR_SECONDARY }
            }
            onPress={() => {
              navigation.navigate("RoomPage", { room: item });
            }}
          >
            <Text
              style={
                item.completed === item.size
                  ? { ...styles.btnText, color: "white" }
                  : { ...styles.btnText, color: "black" }
              }
            >
              {item.name}
            </Text>
            <Text
              style={
                item.completed === item.size
                  ? { ...styles.btnText, color: "white" }
                  : { ...styles.btnText, color: "black" }
              }
            >
              {item.completed}/{item.size}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 9,
    margin: 5,
    borderRadius: 10,
    width: "95%",
    height: heightPercentageToDP("8"),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: heightPercentageToDP("2.5"),
    textAlign: "center",
    marginRight: 10,
    marginLeft: 10,
    alignSelf: "center",
    fontFamily: FONT_NORMAL,
  },
});
export default MyRooms;
