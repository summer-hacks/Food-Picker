import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, Text, View, TouchableOpacity } from "react-native";
import firebase from "../../firebase.js";
import { COLOR_PRIMARY_LIGHT, COLOR_SECONDARY, FONT_NORMAL } from "../common";
import Container from "../components/Container";
import BigHeader from "../components/BigHeader";
import StepHeader from "../components/StepHeader";
import Swipeout from "react-native-swipeout";

import { heightPercentageToDP } from "react-native-responsive-screen";
function MyRooms({ route, navigation }) {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomIds, setRoomIds] = useState([]);
  const [activeRoom, setActive] = useState(0);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
      const userRef = firebase.database().ref("users/" + currentUser.uid);
      userRef.once("value", async (snap) => {
        if (snap.val().rooms) {
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
        }
      });
    }
  }, [roomIds]);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this room? This will not impact anyone else.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const userRef = firebase
              .database()
              .ref("users/" + firebase.auth().currentUser.uid);
            userRef.once(
              "value",
              (snap) => {
                const remaining = snap
                  .val()
                  .rooms.filter((ele) => ele !== activeRoom);
                userRef.update({
                  rooms: remaining,
                });
                setRoomIds(remaining);
              },
              (error) => alert(error)
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const swipeoutBtns = [
    {
      text: "Delete",
      onPress: handleDelete,
    },
  ];

  return (
    <Container>
      <BigHeader title="My Rooms" />
      <View style={{ flex: 1 }}>
        {rooms.length > 0 ? (
          rooms.map((item) => (
            <Swipeout
              key={item.roomId}
              right={swipeoutBtns}
              style={styles.btnView}
              onOpen={() => {
                setActive(item.roomId);
              }}
            >
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
              </TouchableOpacity>
            </Swipeout>
          ))
        ) : (
          <StepHeader step="no rooms yet!" />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: "100%",
    padding: heightPercentageToDP("1"),
  },
  btnView: {
    height: heightPercentageToDP("8"),
    margin: heightPercentageToDP(".5"),
    borderRadius: 10,
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
