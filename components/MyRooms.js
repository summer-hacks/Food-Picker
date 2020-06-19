import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';

function MyRooms({route, navigation}) {
    const {user} = route.params
    const [rooms, setRooms] = useState([])

    useEffect(() => {
      userRef = firebase.database().ref('users/' + user.uid)
      userRef.once('value', snap => {
        console.log(snap.val().rooms)
        setRooms(snap.val().rooms)
      })
    }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , marginTop: 50}}>
        <FlatList
          data = {rooms}
          renderItem = { ({item}) => 
            <TouchableOpacity style={styles.btn} onPress={ () => {
              console.log("clicked")
            }}>
            <Text style={styles.btnText}>{item}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
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
export default MyRooms;