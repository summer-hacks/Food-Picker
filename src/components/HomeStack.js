import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../screens/HomeScreen"
import CreateRoom from "../screens/CreateRoom"
import PartyInfo from "../screens/PartyInfo"
import JoinRoom from "../screens/JoinRoom"
import Header from "./header"
import MyRooms from '../screens/MyRooms';

const screens = {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Home'/>
            }
        }
    },

    CreateRoom:{
        screen: PartyInfo,
        navigationOptions: ({navigation}) => {
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },

    myRoom: {
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
        headerStyle: { backgroundColor: "#eee", height: 100}
    }
})

export default HomeStack