import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tinder from "./screens/Tinder";
import Search from "./screens/Search";
import HomeScreen from "./screens/HomeScreen";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom.js";
import MyRooms from "./screens/MyRooms";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import StartSignUp from "./screens/SignUp/StartSignUp";
import NameSignUp from "./screens/SignUp/NameSignUp";
import EmailSignUp from "./screens/SignUp/EmailSignUp";
import LocationSignUp from "./screens/SignUp/LocationSignUp";
import DoneSignUp from "./screens/SignUp/DoneSignUp";
import BirthdaySignUp from "./screens/SignUp/BirthdaySignUp";
import "./global.js";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "karla-bold": require("./assets/fonts/Karla-Bold.ttf"),
    "karla-italic": require("./assets/fonts/Karla-Italic.ttf"),
    "karla-regular": require("./assets/fonts/Karla-Regular.ttf"),
  });
};

// set up navigation
const Stack = createStackNavigator();

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PhoneNumberLogin"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen name="StartSignUp" component={StartSignUp} />
        <Stack.Screen name="NameSignUp" component={NameSignUp} />
        <Stack.Screen name="BirthdaySignUp" component={BirthdaySignUp} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="LocationSignUp" component={LocationSignUp} />
        <Stack.Screen name="DoneSignUp" component={DoneSignUp} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Main Menu" }}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Tinder" component={Tinder} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="MyRooms" component={MyRooms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
