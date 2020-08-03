import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import PartyInfo from "./PartyInfo"
import JoinRoom from "./JoinRoom"
import Header from "../header"

const screens = {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => {
            // title: "Home"
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Home'/>
            }
        }
    },
    CreateRoom:{
        screen: PartyInfo,
        navigationOptions: ({navigation}) => {
            // title: "Home"
            return { 
                headerTitle: () => <Header navigation={navigation} title= 'Create a Room'/>
            }
        }
    },
    JoinRoom: {
        screen: JoinRoom,
        navigationOptions: ({navigation}) => {
            // title: "Home"
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