import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import firebase from '../firebase.js';


const Card = ({restaurant, handleChoice, navigation}) => {
    return (
    <View style={styles.container} >
        <Text style={styles.text}>{restaurant.name}</Text>
        <View style = {styles.btnContainer}>
              <Button color="green" style={styles.btnYes} onPress={() => {handleChoice("yes",restaurant.id, navigation)}} title="yes"/>
              <Text>               </Text>
              <Button color="red" onPress={() => {handleChoice("no",restaurant.id, navigation)}} title="no"/>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        width: 300, height: 200,
        position: 'absolute',
        backgroundColor: "white",
      },
    item: {
      backgroundColor:'#161a7e',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 5,
    },
    text: {
      fontSize: 20,
      color: 'black'
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  });
  
export default Card