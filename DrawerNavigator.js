import React from "react";

import {createAppContainer} from "react-navigation"
import {createDrawerNavigator}  from "react-navigation-drawer"
import {Dimensions} from "react-native"

import { AntDesign, Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"

import { 
    ProfileScreen, 
    MessageScreen, 
    ActivityScreen, 
    ListScreen, 
    ReportScreen, 
    StatisticScreen, 
    SignOutScreen
} from './screens'

import SideBar from './Components/SideBar' 

import { useState } from "react";
import {
  NavigationContainer,
  View,
  Image,
  Text,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tinder from "./screens/Tinder";
import Search from "./screens/Search";
import HomeScreen from "./screens/HomeScreen";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom.js";
import MyRooms from "./screens/MyRooms";
import RoomPage from "./screens/RoomPage.js";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
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

import Header from "./header"
import HomeStack from "./screens/HomeStack"

const fetchFonts = () => {
  return Font.loadAsync({
    "karla-bold": require("./assets/fonts/Karla-Bold.ttf"),
    "karla-italic": require("./assets/fonts/Karla-Italic.ttf"),
    "karla-bolditalic": require("./assets/fonts/Karla-BoldItalic.ttf"),
    "karla-regular": require("./assets/fonts/Karla-Regular.ttf"),
  });
};

// user for now
const currentUser = {
  displayName: "Janet",
  uid: "jhuang",
};

const user = currentUser
 
const DrawerNavigator = createDrawerNavigator({
    HomeScreen: {
      screen: HomeStack,
      navigationOptions: {
        //title: "Home"
        title: "Home",
        headerTitle: () => <Header />,
        drawerIcon: ({tintColor}) => <AntDesign name="home" size={16} color={tintColor}/>
      }
    },
    MyRooms: {
      // screen: (props) => <MyRooms {...props} user={user} />,
      screen: MyRooms,
      navigationOptions: {
          title: "My Rooms",
          drawerIcon: ({tintColor}) => <MaterialIcons name="group" size={16} color={tintColor} /> 
      }
    },
    MyRestaurant: {
      screen: HomeScreen,
      navigationOptions: {
        title: "My Restaurants",
        drawerIcon: ({tintColor}) => <MaterialCommunityIcons name="food" size={16} color={tintColor} /> 
      }
    },
    SignOutScreen: {
      screen: SignOutScreen,
      navigationOptions: {
        title: "Sign Out",
        drawerIcon: ({tintColor}) => <Feather name="log-out" size={16} color={tintColor} /> 
      }

    }
  
},{
    contentComponent: props => <SideBar {...props}/>,

    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true,

    contentOptions: {
        activeBackgroundColor: "rgba(255, 131, 100, 0.2)",
        activeTintColor: "#FF8364",
        itemsContainerStyle: {
            marginTop: 16,
            marginHorizontal: 8
        },
        itemStyle: {
            borderRadius: 4
        }
    }
})

export default createAppContainer(DrawerNavigator);
