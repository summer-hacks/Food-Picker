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

    // get restaurant data via Yelp API (this is passed to the CreateRoom component and then stored in firebase)
    // submitting blank form raises error
    const getData = async(location, radius, maxRes) => {
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
        const res = await fetch(url + `location=${location}&radius=${radius}&categories=restaurants&limit=${maxRes}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + api_key
          }
        })
        const resJson = await res.json();
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
      <TouchableOpacity style={styles.btn} onPress={async() => {
         const data = await getData(location, radius, maxRes);
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
    }
});

export default Search;
