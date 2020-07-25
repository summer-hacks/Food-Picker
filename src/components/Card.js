import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import CardDetail from "./CardDetail";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  COLOR_PRIMARY,
  FONT_NORMAL,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
} from "../common";
const Card = ({ roomId, restaurant, handleChoice, navigation }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <View style={styles.bigContainer}>
      <Overlay
        isVisible={visibility}
        overlayBackgroundColor="red"
        fullScreen={true}
      >
        <CardDetail restaurant={restaurant} closeCard={setVisibility} />
      </Overlay>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setVisibility(true);
          }}
        >
          <Image
            style={{ width: 250, height: 250 }}
            source={{
              uri: restaurant.image_url,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{restaurant.name} </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: "black" }}
          onPress={() => {
            handleChoice("no", restaurant.id, navigation);
          }}
        >
          <View style={styles.icon}>
            <FeatherIcon color="white" name="x" size={wp("10%")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: COLOR_PRIMARY }}
          onPress={() => {
            handleChoice("yes", restaurant.id, navigation);
          }}
        >
          <View style={styles.icon}>
            <Icon color="white" name="check" size={wp("10%")} />
          </View>
        </TouchableOpacity>
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
    width: wp("75%"),
    height: hp("45%"),
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.3,
    elevation: 10,
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
