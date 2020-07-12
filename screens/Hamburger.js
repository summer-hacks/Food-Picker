import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import { createStackNavigator } from "@react-navigation/stack";
import Tinder from "./Tinder";
import Search from "./Search";
import HomeScreen from "./HomeScreen";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom.js";
import MyRooms from "./MyRooms";
import RoomPage from "./RoomPage.js";
import Login from "./Login";
import SignUp from "./SignUp";
import { Ionicons } from "@expo/vector-icons";
import PartyInfo from "./PartyInfo.js";
import StartSignUp from "./SignUp/StartSignUp";
import NameSignUp from "./SignUp/NameSignUp";
import EmailSignUp from "./SignUp/EmailSignUp";
import LocationSignUp from "./SignUp/LocationSignUp";
import DoneSignUp from "./SignUp/DoneSignUp";
import BirthdaySignUp from "./SignUp/BirthdaySignUp";
import "../global.js";
import * as Font from "expo-font";
import { AppLoading } from "expo";

export default class Hamburger extends React.Component{
    render() {
        return (
            <View> 
                <SafeAreaView style ={{flex: 1}}>
                    <TouchableOpacity 
                        style= {{ alignItems: "flex-end", margin: 16 }}
                        onPress={this.props.navigation.OpenDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="161924" />
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.text}>{this.props.name}Screen</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})
