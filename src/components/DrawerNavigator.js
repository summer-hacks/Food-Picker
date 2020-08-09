import React from "react";

import {createAppContainer} from "react-navigation";
import {createDrawerNavigator}  from "react-navigation-drawer";
import {Dimensions} from "react-native";

import { AntDesign, Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import SignOutScreen from "./Screen";

import SideBar from "./SideBar";
import PartyInfo from "../screens/PartyInfo";
import MyRooms from "../screens/MyRooms";
import "../../global.js";
import HomeStack from "../components/HomeStack"
import firebase from "../../firebase"

const currentUser = firebase.auth().currentUser;
 
const DrawerNavigator = createDrawerNavigator({
    HomeScreen: {
      screen: HomeStack,
      navigationOptions: {
        title: "Home",
        // headerTitle: () => <Header />,
        drawerIcon: ({tintColor}) => <AntDesign name="home" size={16} color={tintColor}/>
      }
    },
    MyRooms: {
      screen: MyRooms,
      navigationOptions: {
          title: "My Rooms",
          // headerTitle: () => <Header />,
          drawerIcon: ({tintColor}) => <MaterialIcons name="group" size={16} color={tintColor} /> 
      }
    },
    CreateRoom: {
      screen: PartyInfo,
      navigationOptions: {
        title: "Create a Room",
        // headerTitle: () => <Header />,
        drawerIcon: ({tintColor}) => <MaterialCommunityIcons name="food" size={16} color={tintColor} /> 
      }
    },
    SignOutScreen: {
      screen: SignOutScreen,
      navigationOptions: {
        title: "Sign Out",
        // headerTitle: () => <Header />,
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
