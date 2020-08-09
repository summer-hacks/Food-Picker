import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../screens/HomeScreen";
import CreateRoom from "../screens/CreateRoom";
import PartyInfo from "../screens/PartyInfo";
import JoinRoom from "../screens/JoinRoom";
import Header from "./header";
import MyRooms from '../screens/MyRooms';
import RoomPage from '../screens/RoomPage';
import Tinder from '../screens/Tinder';
import Search from '../screens/Search';

const screens = {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Home'/>
            }
        }
    },

    PartyInfo:{
        screen: PartyInfo,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    RoomPage:{
        screen: RoomPage,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    Search:{
        screen: Search,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    CreateRoom:{
        screen: CreateRoom,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    Tinder:{
        screen: Tinder,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    MyRooms: {
        screen: MyRooms,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'My Rooms'/>
            }
        }
    },
    JoinRoom: {
        screen: JoinRoom,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Join a Room'/>
            }
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: "#444",
        headerStyle: { backgroundColor: "#FFF", height: 100, shadowColor: 'transparent'},
    }
})

export default HomeStack