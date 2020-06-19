import React, {useState, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import firebase from '../firebase.js';

// main menu assuming the user has already logged in
function HomeScreen({ navigation }) {
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
      // var currentUser = firebase.auth().currentUser;

      // for testing purposes: 
      const currentUser = firebase.database().ref('users/DVSTISolSuXLJhcvLnQ40Qet1312')
      if (currentUser){
        setUser(currentUser)
        currentUser.once('value', snap => setUserName(snap.val().name), error => alert(error));
      }
    }, [])
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome {userName}!</Text>
        <Button
          title="Create Room"
          onPress={() => navigation.navigate('PartyInfo', {user: user})}
        />
        <Button
          title="Join Room"
          onPress={() => navigation.navigate('JoinRoom', {user: user})}
        />
        <Button
          title="My Rooms"
          onPress={() => navigation.navigate('MyRooms', {user: user})}
        />
      </View>
    );
    
  }

  export default HomeScreen;