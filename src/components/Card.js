import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import CardDetail from "./CardDetail";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLOR_PRIMARY } from "../common";

const Card = ({ roomId, restaurant, navigation }) => {
  return (
    <View style={styles.container}>

      <Image
        style={{ height: 250, width: 250, borderWidth: 2, borderRadius: 5 }}
        source={{
          uri: restaurant.image_url,
        }}
      />
      <View style={{ alignSelf: 'flex-start', marginLeft: 37, marginTop: -15 }}>
        <Text style={styles.text}>{restaurant.name} </Text>
        <Text style={{ fontSize: hp('1.75%'), color: 'grey' }}>{restaurant.categories[0].title}</Text>
        {/* <Text>{restaurant.location.display_address[0]} </Text>
          <Text >{restaurant.location.display_address[restaurant.location.display_address.length - 1]} </Text> */}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    position: "absolute",
  },
  text: {
    fontFamily: "karla-bold",
    fontSize: hp("3.5%"),
    marginTop: hp("4%"),
  },
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
    // flex: 1,
    // width: wp("80%"),
    // height: hp("45%"),
    // position: "absolute",
    // backgroundColor: "white",
    // borderRadius: 10,
    // borderColor: "black",
    // shadowColor: "gray",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.05,
    // shadowRadius: 8.3,
    // elevation: 0,
    flex: 1,
    borderWidth: 3,
    width: wp("80%"),
    height: hp("45%"),
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: 'white',
    position: "absolute",
  },
  btnContainer: {
    marginTop: hp("50%"),
    width: wp("70%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: wp("20%"),
    height: wp("20%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: 50,
    justifyContent: "center",
  },
});

export default Card;
