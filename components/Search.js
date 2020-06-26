import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';

// prob shouldn't be hardcoding api key in here but works for now 
const api_key = 'rfzFsGmwjhmXJqBMeXgjk8VTwpz8zevZE0xPzGz2YAzDiP15VI5alXOxkDD_GlFneIOTsee7mp5RYx5DVb10CJOlNw58NqlfmwItWr4D5NzfFWge7XEnp8kNrE7UXnYx'
const url = 'https://api.yelp.com/v3/businesses/search?'

const Search = ({ route, navigation }) => {
    const { user } = route.params;
    const { partySize } = route.params;
    const { partyName } = route.params;

    const [location, setLocation] = useState('')
    const [radius, setRadius] = useState(0)
    const [maxRes, setMaxRes] = useState(0)
    const [dollars, setDollars] = useState([])
    const [$clicked, set$] = useState(false)
    const [$$clicked, set$$] = useState(false)
    const [$$$clicked, set$$$] = useState(false)
    const [$$$$clicked, set$$$$] = useState(false)

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
      if ($clicked){
        setDollars(prev => prev.filter(ele => ele !== 1))
      } else {
        setDollars(prev => [...prev, 1])
      }
      set$(prev => !prev)
    }

    const handle$$ = () => {
      if ($$clicked){
        setDollars(prev => prev.filter(ele => ele !== 2))
      } else {
        setDollars(prev => [...prev, 2])
      }
      set$$(prev => !prev)
    }

    const handle$$$ = () => {
      if ($$$clicked){
        setDollars(prev => prev.filter(ele => ele !== 3))
      } else {
        setDollars(prev => [...prev, 3])
      }
      set$$$(prev => !prev)
    }

    const handle$$$$ = () => {
      if ($$$$clicked){
        setDollars(prev => prev.filter(ele => ele !== 4))
      } else {
        setDollars(prev => [...prev, 4])
      }
      set$$$$(prev => !prev)
    }

    // get restaurant data via Yelp API (this is passed to the CreateRoom component and then stored in firebase)
    // submitting blank form raises error
    const getData = async(location, radius, maxRes, dollars) => {   
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
        const res = await fetch(url + `location=${location}&radius=${radius}&categories=restaurants&limit=${maxRes}&price=${prices}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + api_key
          }
        })
        const resJson = await res.json();
        console.log(url + `location=${location}&radius=${radius}&categories=restaurants&limit=${maxRes}&price=${prices}`)
        return resJson.businesses
        }
    }
    
    return(
    <View style={styles.container}>
      <TextInput 
        placeholder="Location" 
        style={styles.input}
        onChangeText={onChangeLocation}
      />
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
         const data = await getData(location, radius, maxRes, dollars);
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
        margin: 5
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
      // backgroundColor: 'salmon',
      borderRadius: 10
    },
});

export default Search;
