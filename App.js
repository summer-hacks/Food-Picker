import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tinder from "./src/screens/Tinder";
import Search from "./src/screens/Search";
import HomeScreen from "./src/screens/HomeScreen";
import CreateRoom from "./src/screens/CreateRoom";
import JoinRoom from "./src/screens/JoinRoom";
import MyRooms from "./src/screens/MyRooms";
import RoomPage from "./src/components/RoomPage";
import Login from "./src/screens/Login";
import { Ionicons } from "@expo/vector-icons";
import PartyInfo from "./src/screens/PartyInfo";
import StartSignUp from "./src/screens/SignUp/StartSignUp";
import NameSignUp from "./src/screens/SignUp/NameSignUp";
import EmailSignUp from "./src/screens/SignUp/EmailSignUp";
import LocationSignUp from "./src/screens/SignUp/LocationSignUp";
import DoneSignUp from "./src/screens/SignUp/DoneSignUp";
import BirthdaySignUp from "./src/screens/SignUp/BirthdaySignUp";
import "./global.js";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// import reduxThunk from "redux-thunk";
import reducer from "./src/reducers/reducer";
import { COLOR_PRIMARY } from "./src/common";

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
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="StartSignUp"
            component={StartSignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
            name="NameSignUp"
            component={NameSignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
            name="BirthdaySignUp"
            component={BirthdaySignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
            name="EmailSignUp"
            component={EmailSignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
            name="LocationSignUp"
            component={LocationSignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
            name="DoneSignUp"
            component={DoneSignUp}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTintColor: COLOR_PRIMARY,
              headerLeftContainerStyle: { marginHorizontal: 15 },
              headerStyle: {
                backgroundColor: "white",
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
};

export default App;
