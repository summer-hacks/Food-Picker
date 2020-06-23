import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from '../firebase.js';

// create a room record in firebase containing the party info + restaurant results
function createRoomRecord(roomId, restaurants, partySize, partyName, user) {
  firebase.database().ref('rooms/' + roomId).set({
    numCompleted: 0,
    numJoined: 1,
    partySize: parseInt(partySize),
    partyName: partyName
  });

  restaurants.forEach(res => {
    firebase.database().ref('rooms/' + roomId + '/restaurants/' + res.id).set({...res, yes: 0, no: 0})
  })

  // add the room id to the user's data record
  // sometimes int, sometimes string?
  const userRef = firebase.database().ref('users/' + user.uid)
  userRef.once('value', snap => {
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
}

const CreateRoom = ({ route, navigation }) => {
  // var name must match that of param passed in via route
  const { restaurants } = route.params;
  const { partySize } = route.params;
  const { partyName } = route.params;
  const { user } = route.params;
  const [roomId, setRoomId] = useState(0)

  useEffect(() => {
    // generate a random room id -- replace with uuid eventually
    const newRoomId = Math.floor(Math.random() * 10 ** 6);

    // create the firebase room record
    createRoomRecord(newRoomId, restaurants, partySize, partyName, user)

    // update state
    setRoomId(newRoomId)
  }, [])

  return( 
      <View style={styles.container}>
        <Text>New Room</Text>
        <Text>Room ID: {roomId}</Text>
        <Text>restaurants length: {restaurants.length}</Text>
        <Text>party size: {partySize}</Text>
        <TouchableOpacity style={styles.btn} onPress={async() => {
          navigation.navigate('Tinder', {
              roomId: roomId,
              user: user
            })
          }
        }>
          <Text style={styles.btnText}>Start Swiping</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    backgroundColor:'#161a7e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    color: 'white'
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


export default CreateRoom;


