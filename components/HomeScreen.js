import React, {useState, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import firebase from '../firebase.js';

// main menu assuming the user has already logged in
function HomeScreen({ navigation }) {
    const [user, setUser] = useState("");

    useEffect(() => {
      var currentUser = firebase.auth().currentUser;
      console.log(currentUser)
      if (currentUser){
        setUser(currentUser)
      }
    }, [])
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome {user.displayName}!</Text>
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