import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../firebase.js';
import { useNavigation } from '@react-navigation/native';

// checks if room exists & is not yet full -- increments number of users joined if both conditions satisfied 
function joinRoom(roomId, navigation) {
    firebase.database().ref('rooms/'+ roomId).once("value",snap => {
        if (snap.exists()){
          if (snap.val().numJoined < snap.val().partySize) {
            firebase.database().ref('rooms/' + roomId).update({
              numJoined: ++snap.val().numJoined
            });
            
            // would also need to add the room id to the user's data record

            navigation.navigate('Tinder', {
              roomId: roomId
            })
            
          } else {
            alert("full room")
          }
        } else {
          alert("nonexisting room")
        }
    });
}

const JoinRoom = () => {
    const navigation = useNavigation();
    const [roomId, setRoomId] = useState(0)

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
      <TouchableOpacity style={styles.btn} onPress={() => joinRoom(roomId, navigation)}>
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


