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
  const [visibility, setVisibility] = useState(false);
  return (
    <View style={styles.bigContainer}>

      <View style={styles.container}>

        <Image
          style={{ width: 250, height: 250 }}
          source={{
            uri: restaurant.image_url,
          }}
        />
        <Text style={styles.text}>{restaurant.name} </Text>
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
    fontSize: hp("2%"),
    marginTop: hp("4%"),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    width: wp("80%"),
    height: hp("45%"),
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8.3,
    elevation: 0,
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
