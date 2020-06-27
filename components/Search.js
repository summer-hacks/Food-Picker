import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, Alert,Keyboard} from 'react-native';
import * as Location from 'expo-location';

// prob shouldn't be hardcoding api key in here but works for now 
const api_key = 'rfzFsGmwjhmXJqBMeXgjk8VTwpz8zevZE0xPzGz2YAzDiP15VI5alXOxkDD_GlFneIOTsee7mp5RYx5DVb10CJOlNw58NqlfmwItWr4D5NzfFWge7XEnp8kNrE7UXnYx'
const url = 'https://api.yelp.com/v3/businesses/search?'

const Search = ({ route, navigation }) => {
    const { user } = route.params;
    const { partySize } = route.params;
    const { partyName } = route.params;

    const [location, setLocation] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [radius, setRadius] = useState(0)
    const [maxRes, setMaxRes] = useState(0)
    const [dollars, setDollars] = useState([])
    const [$clicked, set$] = useState(false)
    const [$$clicked, set$$] = useState(false)
    const [$$$clicked, set$$$] = useState(false)
    const [$$$$clicked, set$$$$] = useState(false)

    const getCurrLocation = async() => {
      console.log('clicked')
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude)
        setLatitude(location.coords.latitude)
        setLocation("Current Location");
      }
    }

    // helper functions to handle user input
    const onChangeLocation = location => {
      setLocation(location);
    }

    const onChangeRadius = radius => {
      setRadius(radius);
    }

    const onChangeMaxRes = maxRes => {
      setMaxRes(maxRes);
    }

    const handle$ = () => {
      Keyboard.dismiss()
      if ($clicked){
        setDollars(prev => prev.filter(ele => ele !== 1))
      } else {
        setDollars(prev => [...prev, 1])
      }
      set$(prev => !prev)
    }

    const handle$$ = () => {
      Keyboard.dismiss()
      if ($$clicked){
        setDollars(prev => prev.filter(ele => ele !== 2))
      } else {
        setDollars(prev => [...prev, 2])
      }
      set$$(prev => !prev)
    }

    const handle$$$ = () => {
      Keyboard.dismiss()
      if ($$$clicked){
        setDollars(prev => prev.filter(ele => ele !== 3))
      } else {
        setDollars(prev => [...prev, 3])
      }
      set$$$(prev => !prev)
    }

    const handle$$$$ = () => {
      Keyboard.dismiss()
      if ($$$$clicked){
        setDollars(prev => prev.filter(ele => ele !== 4))
      } else {
        setDollars(prev => [...prev, 4])
      }
      set$$$$(prev => !prev)
    }

    // get restaurant data via Yelp API (this is passed to the CreateRoom component and then stored in firebase)
    // submitting blank form raises error
    const getData = async(location, longitude, latitude, radius, maxRes, dollars) => {   
      const prices = dollars.join(',')
      if (!location || !radius || !maxRes) {
        Alert.alert(
          'Empty field',
          'Please enter all info',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: true},
        );
      } else {
        let full_url = ""
        if (location == "Current Location"){
          full_url = url + `latitude=${latitude}&longitude=${longitude}&radius=${radius}&categories=restaurants&limit=${maxRes}&price=${prices}`
        } else {
          full_url = url + `location=${location}&radius=${radius}&categories=restaurants&limit=${maxRes}&price=${prices}`
        }

        const res = await fetch(full_url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + api_key
          }
        })
        const resJson = await res.json();
        return resJson.businesses
        }
    }
    let defaultLocation = ""

    if (longitude && latitude) {
      defaultLocation = "Current Location"
    }

    return(
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
        <View style={{flex:4}}>
          <TextInput
          placeholder="Location" 
          style={styles.input}
          onChangeText={onChangeLocation}
          defaultValue={defaultLocation}
          value={location}
          />
        </View>
        <View style={{flex:1}}>
          <Button title="CL"onPress={getCurrLocation}/>
        </View>
      </View>
      <TextInput 
        placeholder="Radius (meters)" 
        keyboardType={'numeric'}
        style={styles.input}
        onChangeText={onChangeRadius}
      />
      <TextInput 
        placeholder="Max Number of Restaurants" 
        keyboardType={'numeric'}
        style={styles.input}
        onChangeText={onChangeMaxRes}
      />
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={{height: 50,width: 50, justifyContent: 'center',borderRadius: 10, backgroundColor: $clicked ? 'salmon' : 'white' }} onPress={handle$}>
          <Text style={{textAlign: 'center', color: $clicked ? 'white' : 'salmon'}}>$</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50,width: 50, justifyContent: 'center',borderRadius: 10, backgroundColor: $$clicked ? 'salmon' : 'white' }} onPress={handle$$}>
          <Text style={{textAlign: 'center', color: $$clicked ? 'white' : 'salmon'}}>$$</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50,width: 50, justifyContent: 'center',borderRadius: 10, backgroundColor: $$$clicked ? 'salmon' : 'white' }} onPress={handle$$$}>
          <Text style={{textAlign: 'center', color: $$$clicked ? 'white' : 'salmon'}}>$$$</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50,width: 50, justifyContent: 'center',borderRadius: 10, backgroundColor: $$$$clicked ? 'salmon' : 'white' }} onPress={handle$$$$}>
          <Text style={{textAlign: 'center', color: $$$$clicked ? 'white' : 'salmon'}}>$$$$</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={async() => {
         const data = await getData(location, longitude, latitude, radius, maxRes, dollars);
         navigation.navigate('CreateRoom', {
          restaurants: data,
          partySize: partySize,
          partyName: partyName,
          user: user
        });
        }
      }>
        <Text style={styles.btnText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        marginBottom: 200
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    dollar: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      borderRadius: 10
    },
});

export default Search;
