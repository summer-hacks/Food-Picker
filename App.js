import React, { useState } from 'react';
import {
  NavigationContainer,
  View,
  Image,
  Text,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Tinder from './src/components/Tinder';
import Search from './src/components/Search';
import HomeScreen from './src/components/HomeScreen';
import CreateRoom from './src/components/CreateRoom';
import JoinRoom from './src/components/JoinRoom';
import MyRooms from './src/components/MyRooms';
import RoomPage from './src/components/RoomPage';
import Login from './src/components/Login';
import { Ionicons } from '@expo/vector-icons';
import PartyInfo from './src/components/PartyInfo';
import StartSignUp from './src/components/SignUp/StartSignUp';
import NameSignUp from './src/components/SignUp/NameSignUp';
import EmailSignUp from './src/components/SignUp/EmailSignUp';
import LocationSignUp from './src/components/SignUp/LocationSignUp';
import DoneSignUp from './src/components/SignUp/DoneSignUp';
import BirthdaySignUp from './src/components/SignUp/BirthdaySignUp';
import './global.js';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import reduxThunk from "redux-thunk";
import reducer from './src/reducers/reducer';

const store = createStore(reducer);

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'karla-bold': require('./assets/fonts/Karla-Bold.ttf'),
      'karla-italic': require('./assets/fonts/Karla-Italic.ttf'),
      'karla-bolditalic': require('./assets/fonts/Karla-BoldItalic.ttf'),
      'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
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
          {/* <Stack.Screen
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
          /> */}
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
          {/* <Stack.Screen name="BirthdaySignUp" component={BirthdaySignUp} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="LocationSignUp" component={LocationSignUp} />
        <Stack.Screen name="DoneSignUp" component={DoneSignUp} />
        <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: 'Main Menu' }}
          />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Tinder' component={Tinder} />
          <Stack.Screen name='JoinRoom' component={JoinRoom} />
          <Stack.Screen name='CreateRoom' component={CreateRoom} />
          <Stack.Screen name='PartyInfo' component={PartyInfo} />
          <Stack.Screen name='RoomPage' component={RoomPage} />
          <Stack.Screen name='MyRooms' component={MyRooms} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
