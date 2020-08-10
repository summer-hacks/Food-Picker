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
import StepHeader from "../components/StepHeader";

import { heightPercentageToDP } from "react-native-responsive-screen";
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
            let date = {};
            await roomRef.once("value", (snap) => {
              const res = snap.val();
              name = res.partyName;
              size = res.partySize;
              completed = res.numCompleted;
              date = new Date(res.timestamp);
            });
            console.log(
              `${date.getMonth() + 1}/${date.getDate()}/${
                date.getFullYear() - 2000
              }`
            );
            return {
              roomId: room,
              name: name,
              size: size,
              completed: completed,
              date: `${date.getMonth() + 1}/${date.getDate()}/${
                date.getFullYear() - 2000
              }`,
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
      {rooms.length > 0 ? (
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
              <View>
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
                      ? {
                          ...styles.btnText,
                          color: "white",
                          fontSize: heightPercentageToDP("2"),
                        }
                      : {
                          ...styles.btnText,
                          color: "black",
                          fontSize: heightPercentageToDP("2"),
                        }
                  }
                >
                  {item.date}
                </Text>
              </View>
              <Text
                style={
                  item.completed === item.size
                    ? { ...styles.btnText, color: "white", alignSelf: "center" }
                    : { ...styles.btnText, color: "black", alignSelf: "center" }
                }
              >
                {item.completed}/{item.size}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <StepHeader step="no rooms yet!" />
      )}
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
    marginRight: 10,
    marginLeft: 10,
    fontFamily: FONT_NORMAL,
    textAlign: "left",
  },
});
export default MyRooms;
