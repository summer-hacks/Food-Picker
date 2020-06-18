import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tinder from './components/Tinder';
import Search from './components/Search';
import HomeScreen from './components/HomeScreen';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom.js';
import MyRooms from './components/MyRooms';
import Login from './components/Login';
import SignUp from './components/SignUp';

import StartSignUp from './components/SignUp/StartSignUp';
import NameSignUp from './components/SignUp/NameSignUp';
import EmailSignUp from './components/SignUp/EmailSignUp';
import LocationSignUp from './components/SignUp/LocationSignUp';
import DoneSignUp from './components/SignUp/DoneSignUp';
import BirthdaySignUp from './components/SignUp/BirthdaySignUp';

// set up navigation
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PhoneNumberLogin" component={Login} />
        <Stack.Screen name="StartSignUp" component={StartSignUp} />
        <Stack.Screen name="NameSignUp" component={NameSignUp} />
        <Stack.Screen name="BirthdaySignUp" component={BirthdaySignUp} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="LocationSignUp" component={LocationSignUp} />
        <Stack.Screen name="DoneSignUp" component={DoneSignUp} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Main Menu' }} />
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