import React, { useState } from "react";
import {
  NavigationContainer,
  View,
  Image,
  Text,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Tinder from "./screens/Tinder";
import Search from "./screens/Search";
import HomeScreen from "./screens/HomeScreen";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom";
import MyRooms from "./screens/MyRooms";
import RoomPage from "./screens/RoomPage";
import Login from "./screens/Login";
import { Ionicons } from "@expo/vector-icons";
import PartyInfo from "./screens/PartyInfo.js";
import StartSignUp from "./screens/SignUp/StartSignUp";
import NameSignUp from "./screens/SignUp/NameSignUp";
import EmailSignUp from "./screens/SignUp/EmailSignUp";
import LocationSignUp from "./screens/SignUp/LocationSignUp";
import DoneSignUp from "./screens/SignUp/DoneSignUp";
import BirthdaySignUp from "./screens/SignUp/BirthdaySignUp";
import "./global.js";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import reduxThunk from "redux-thunk";
import reducer from './src/reducers/reducer';

const store = createStore(reducer);


const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "karla-bold": require("./assets/fonts/Karla-Bold.ttf"),
      "karla-italic": require("./assets/fonts/Karla-Italic.ttf"),
      "karla-bolditalic": require("./assets/fonts/Karla-BoldItalic.ttf"),
      "karla-regular": require("./assets/fonts/Karla-Regular.ttf"),
    });
  };
  
  // set up navigation
  const Stack = createStackNavigator();

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PhoneNumberLogin"
          component={Login}
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen
          name='StartSignUp'
          component={StartSignUp}
          options={{
            headerTintColor: global.orange,
            headerLeftContainerStyle: { marginHorizontal: 15 },
            headerStyle: {
              backgroundColor: 'white',
              borderWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
            headerBackTitleVisible: false,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name='NameSignUp'
          component={NameSignUp}
          options={{
            headerTintColor: global.orange,
            headerLeftContainerStyle: { marginHorizontal: 15 },
            headerStyle: {
              backgroundColor: 'white',
              borderWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
            headerBackTitleVisible: false,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name='BirthdaySignUp'
          component={BirthdaySignUp}
          options={{
            headerTintColor: global.orange,
            headerLeftContainerStyle: { marginHorizontal: 15 },
            headerStyle: {
              backgroundColor: 'white',
              borderWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
            headerBackTitleVisible: false,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name='EmailSignUp'
          component={EmailSignUp}
          options={{
            headerTintColor: global.orange,
            headerLeftContainerStyle: { marginHorizontal: 15 },
            headerStyle: {
              backgroundColor: 'white',
              borderWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
            headerBackTitleVisible: false,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name='LocationSignUp'
          component={LocationSignUp}
          options={{
            headerTintColor: global.orange,
            headerLeftContainerStyle: { marginHorizontal: 15 },
            headerStyle: {
              backgroundColor: 'white',
              borderWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              },
            },
            headerBackTitleVisible: false,
            headerTitle: null,
          }}
        />
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
        <Stack.Screen name="PartyInfo" component={PartyInfo} />
        <Stack.Screen name="RoomPage" component={RoomPage} />
        <Stack.Screen name="MyRooms" component={MyRooms} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
