import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native'
import { DrawerNavigatorItems, DrawerActions } from 'react-navigation-drawer'
import { EvilIcons } from '@expo/vector-icons'
import { Button } from 'native-base'
import firebase from '../../firebase'


// const [currentUser, setCurrentUser] = useState("");
// setCurrentUser(firebase.auth().currentUser);

//const currentUser = firebase.auth().currentUser;

export default Sidebar = props => (
    <ScrollView>
        <ImageBackground style={{ width: undefined, padding: 16, paddingTop: 48, backgroundColor: "#FF8364"}}>
            <Button transparent onPress={()=> props.navigation.dispatch( DrawerActions.closeDrawer() )} style={styles.icon}>
                <EvilIcons name="close" size={24} color="#FFF"/>
            </Button>

            <Image source = {require ("./profile.jpg")} style= { styles.profile }/>
            <Text style= {styles.greet}> Hello!</Text>
            {/* <Text style= {styles.name}> {currentUser.displayName} </Text> */}

        </ImageBackground>
        

        <View style={styles.container}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
        alignSelf: "center"
    },
    name: {
        color: "#FFF",
        fontSize: 25,
        fontWeight: "600",
        fontStyle: "italic",
        alignSelf: "center"
    },
    greet: {
        color: "#FFF",
        fontStyle: "italic",
        marginVertical: 8,
        fontSize: 16,
        alignSelf: "center"
    },
    icon: {
        position: 'absolute',
        left: 10,
        marginVertical: 8
    }

});