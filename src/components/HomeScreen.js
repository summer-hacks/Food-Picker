import React from 'react';
import { Button, View } from 'react-native';
import firebase from '../firebase';

// main menu assuming the user has already logged in
function HomeScreen({ navigation }) {
  console.log(firebase.auth().currentUser);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Create Room"
          onPress={() => navigation.navigate('Search')}
        />
        <Button
          title="Join Room"
          onPress={() => navigation.navigate('JoinRoom')}
        />
        <Button
          title="My Rooms"
          onPress={() => navigation.navigate('MyRooms')}
        />
      </View>
    );
  }

  export default HomeScreen;