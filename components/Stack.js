import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card'

const Stack = ({cards, cb, nav}) => {
    return(
        <View style = {styles.container}>
            {cards.map(card => <Card key={card.id} restaurant={card} handleChoice={cb} navigation={nav}/>)}            
        </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default Stack