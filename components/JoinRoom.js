import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../firebase.js';

// checks if room exists & is not yet full -- increments number of users joined if both conditions satisfied 
function joinRoom(roomId, navigation, user) {
    firebase.database().ref('rooms/'+ roomId).once("value",snap => {
        if (snap.exists()){
          if (snap.val().numJoined < snap.val().partySize) {
            firebase.database().ref('rooms/' + roomId).update({
              numJoined: ++snap.val().numJoined
            });
            
            // add the room id to the user's data record
            userRef = firebase.database().ref('users/' + user.uid)
            userRef.set('value', snap => {
              if (snap.val().rooms){
                userRef.update({
                  rooms: [...snap.val().rooms, roomId]
                })
              } else {
                userRef.update({
                  rooms: [roomId]
                })
              }
            }, error => alert(error));

            navigation.navigate('Tinder', {
              roomId: roomId,
              user: user
            })
            
          } else {
            alert("full room")
          }
        } else {
          alert("nonexisting room")
        }
    });
}

const JoinRoom = ({ route, navigation}) => {
    const [roomId, setRoomId] = useState(0)
    const {user} = route.params

    const onChangeRoomId = roomId => {
        setRoomId(roomId);
    }

    return(
    <View style={styles.header}>
      <TextInput 
        placeholder="Room Id" 
        style={styles.input}
        onChangeText={onChangeRoomId}
      />
      <TouchableOpacity style={styles.btn} onPress={() => joinRoom(roomId, navigation, user)}>
        <Text style={styles.btnText}>Join</Text>
      </TouchableOpacity>
    </View>
  )

  };

  const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default JoinRoom;


