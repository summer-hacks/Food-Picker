import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import firebase from "../../firebase.js";

// main menu assuming the user has already logged in
function HomeScreen({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    // returns a user object from firebase authentication
    // access user data in real-time database with a reference to users/currentUser.uid
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome {user.displayName}!</Text>
      <Button
        title="Create Room"
        onPress={() => navigation.navigate("PartyInfo")}
      />
      <Button
        title="Join Room"
        onPress={() => navigation.navigate("JoinRoom")}
      />
      <Button title="My Rooms" onPress={() => navigation.navigate("MyRooms")} />
    </View>
  );
}

export default HomeScreen;
