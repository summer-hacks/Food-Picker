import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import firebase from '../../firebase.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ContainerWithBottomButton from '../components/ContainerWithBottomButton';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  BODY_FONT_SIZE,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
  BODY_BOTTOM,
  ICON_BORDER_WIDTH,
  ICON_BORDER_RADIUS,
  COLOR_PRIMARY,
  SECTION_HEIGHT,
  HEADING_FONT_SIZE,
  HEADING_PADDING_TOP,
} from '../common';

// checks if room exists & is not yet full -- increments number of users joined if both conditions satisfied
function joinRoom(roomId, navigation, user) {
  firebase
    .database()
    .ref('rooms/' + roomId)
    .once('value', (snap) => {
      // check if room exists
      if (snap.exists()) {
        // check if room is full
        if (snap.val().numJoined < snap.val().partySize) {
          const userRef = firebase.database().ref('users/' + user.uid);
          userRef.once(
            'value',
            (snap) => {
              console.log(snap.val());
              // check if user already in room
              if (snap.val().rooms) {
                if (snap.val().rooms.includes(roomId)) {
                  alert('already in room');
                  return;
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

              // update num joined for room and add user to room
              const roomRef = firebase.database().ref('rooms/' + roomId);

              roomRef.once('value', (snap) => {
                roomRef.update({
                  numJoined: ++snap.val().numJoined,
                  users: [...snap.val().users, user.uid],
                });
              });

              navigation.navigate('Tinder', {
                roomId: roomId,
              });
            },
            (error) => alert(error)
          );
        } else {
          alert('full room');
        }
      } else {
        alert('nonexisting room');
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
    <ContainerWithBottomButton
      bottomText='Start Swiping!'
      bottomOnPress={() => joinRoom(roomId, navigation, user)}
    >
      <View style={{ bottom: BODY_BOTTOM, height: SECTION_HEIGHT }}>
        <View style={styles.icon}>
          <Icon color='black' name='account-multiple-plus-outline' size={25} />
        </View>
        <Text style={styles.normTxt}>Join a party</Text>
      </View>
      <TextInput
        placeholder='Room ID'
        style={styles.textInput}
        keyboardType={'numeric'}
        onChangeText={onChangeRoomId}
      />
    </ContainerWithBottomButton>
  );
};

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    fontFamily: 'karla-regular',
    fontSize: BODY_FONT_SIZE,
    borderBottomColor: '#000',
    margin: 5,
    bottom: hp('10%'),
    borderBottomWidth: TEXTINPUT_BOTTOM_BORDER_WIDTH,
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderWidth: ICON_BORDER_WIDTH,
    borderColor: COLOR_PRIMARY,
    borderRadius: ICON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normTxt: {
    fontFamily: 'karla-bold',
    fontSize: HEADING_FONT_SIZE,
    paddingTop: HEADING_PADDING_TOP,
  },
});

export default JoinRoom;
