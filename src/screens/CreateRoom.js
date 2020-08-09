import React, { useState, useEffect } from "react";
import {
  Share,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase.js";
import {
  COLOR_PRIMARY,
  BODY_FONT_SIZE,
  HEADING_FONT_SIZE,
  ICON_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
} from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import ContainerWithBottomButton from "../components/ContainerWithBottomButton";

// create a room record in firebase containing the party info + restaurant results
async function pushRestaurants(roomId, restaurants) {
  for (var i = 0, len = restaurants.length; i < len; i++) {
    await firebase
      .database()
      .ref("rooms/" + roomId + "/restaurants/" + restaurants[i].id)
      .set({ ...restaurants[i], yes: 0, no: 0 });
  }
}

async function createRoomRecord(roomId, restaurants, partySize, partyName, user) {
  firebase
    .database()
    .ref("rooms/" + roomId)
    .set({
      numCompleted: 0,
      numJoined: 1,
      partySize: parseInt(partySize),
      partyName: partyName,
      users: [user.uid],
    });

  await pushRestaurants(roomId, restaurants);

  // add the room id to the user's data record
  // sometimes int, sometimes string?
  const userRef = firebase.database().ref("users/" + user.uid);

  userRef.once(
    "value",
    (snap) => {
      if (snap.val().rooms) {
        userRef.update({
          rooms: [...snap.val().rooms, roomId],
        });
      } else {
        userRef.update({
          rooms: [roomId],
        });
      }
    },
    (error) => alert(error)
  );
}

const CreateRoom = ({ route, navigation }) => {
  // var name must match that of param passed in via route
  const { restaurants } = route.params;
  const { partySize } = route.params;
  const { partyName } = route.params;
  // const { user } = route.params;
  const [roomId, setRoomId] = useState(0);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    // generate a random room id -- replace with uuid eventually
    const newRoomId = Math.floor(Math.random() * 10 ** 6);

    // create the firebase room record
    createRoomRecord(newRoomId, restaurants, partySize, partyName, user);

    // update state
    setRoomId(newRoomId);
  }, []);

  const onShare = async (roomId) => {
    try {
      const result = await Share.share({
        message: `Join my room in Chikin Tinder using this id: ${roomId}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ContainerWithBottomButton
      bottomText="Start Swiping"
      bottomOnPress={() => {
        navigation.navigate("Tinder", {
          roomId: roomId,
        });
      }}
    >
      <Text style={styles.bigTxt}>Room ID: {roomId}</Text>
      <Text style={styles.normTxt}>
        {partySize - 1 !== 1
          ? `Share this code with the other ${
              partySize - 1
            } people in your party!`
          : `Share this code with the other person in your party!`}
      </Text>
      <View style={styles.icon}>
        <Icon
          color={COLOR_PRIMARY}
          name="share"
          size={wp("10%")}
          onPress={() => {
            onShare(roomId);
          }}
        />
      </View>
    </ContainerWithBottomButton>
  );
};

const styles = StyleSheet.create({
  bigTxt: {
    fontFamily: "karla-bold",
    fontSize: HEADING_FONT_SIZE,
  },
  normTxt: {
    fontFamily: "karla-bold",
    fontSize: BODY_FONT_SIZE,
  },
  icon: {
    width: wp("15%"),
    height: wp("15%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLOR_PRIMARY,
    borderWidth: ICON_BORDER_WIDTH,
    borderRadius: ICON_BORDER_RADIUS,
  },
});

export default CreateRoom;
