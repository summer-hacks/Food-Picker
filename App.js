import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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

  const backButton = ({ navigation }) => ({
    headerBackTitleVisible: false,
    headerTitle: null,
    headerStyle: {
      backgroundColor: "white",
      borderWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerLeft: () => (
      <Icon
        name="chevron-left"
        size={wp("9%")}
        color={COLOR_PRIMARY}
        style={{ marginLeft: wp("3%") }}
        onPress={() => navigation.goBack()}
      />
    ),
  });

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
            options={backButton}
          />
          <Stack.Screen
            name="NameSignUp"
            component={NameSignUp}
            options={backButton}
          />
          <Stack.Screen
            name="BirthdaySignUp"
            component={BirthdaySignUp}
            options={backButton}
          />
          <Stack.Screen
            name="EmailSignUp"
            component={EmailSignUp}
            options={backButton}
          />
          <Stack.Screen
            name="LocationSignUp"
            component={LocationSignUp}
            options={backButton}
          />
          <Stack.Screen
            name="DoneSignUp"
            component={DoneSignUp}
            options={backButton}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={backButton}
          />
          <Stack.Screen name="Search" component={Search} options={backButton} />
          <Stack.Screen name="Tinder" component={Tinder} options={backButton} />
          <Stack.Screen
            name="JoinRoom"
            component={JoinRoom}
            options={backButton}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoom}
            options={backButton}
          />
          <Stack.Screen
            name="PartyInfo"
            component={PartyInfo}
            options={backButton}
          />
          <Stack.Screen
            name="MyRooms"
            component={MyRooms}
            options={({ navigation }) => ({
              headerBackTitleVisible: false,
              headerTitle: null,
              headerStyle: {
                backgroundColor: "white",
                borderWidth: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
              headerLeft: () => (
                <Icon
                  name="chevron-left"
                  size={wp("9%")}
                  color={COLOR_PRIMARY}
                  style={{ marginLeft: wp("3%") }}
                  onPress={() => navigation.navigate("Home")}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
