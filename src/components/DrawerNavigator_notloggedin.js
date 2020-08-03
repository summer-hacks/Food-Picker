import React from "react";

import {createAppContainer} from "react-navigation"
import {createDrawerNavigator}  from "react-navigation-drawer"
import {Dimensions} from "react-native"

import { AntDesign} from "@expo/vector-icons"
import SideBar from './SideBar' 

import { useState } from "react";
import {
  NavigationContainer,
  View,
  Image,
  Text,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartSignUp from "../screens/SignUp/StartSignUp";
import "../../global.js";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./header"
import HomeStack from "./HomeStack"
import HomeScreen from "../screens/HomeScreen"

// user for now
const currentUser = {
  displayName: "Janet",
  uid: "jhuang",
};

const user = currentUser
 
const DrawerNavigatorNotLoggedIn = createDrawerNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        //title: "Home"
        title: "Not Signed in. Please sign in!",
        headerTitle: () => <Header />,
        drawerIcon: ({tintColor}) => <AntDesign name="home" size={16} color={tintColor}/>
      },
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
});

export default createAppContainer(DrawerNavigatorNotLoggedIn);
