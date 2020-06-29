import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../components/Card'

const Stack = ({ cards, cb, nav }) => {
    return (
        <View style={styles.container}>
            {cards.map(card => <Card key={card.id} restaurant={card} handleChoice={cb} navigation={nav} />)}
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