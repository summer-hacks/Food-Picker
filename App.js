import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tinder from './components/Tinder';
import Search from './components/Search';
import HomeScreen from './components/HomeScreen';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom.js';
import MyRooms from './components/MyRooms.js';
import PartyInfo from './components/PartyInfo.js';

// set up navigation
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Main Menu' }} />
        <Stack.Screen name="PartyInfo" component={PartyInfo} />
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