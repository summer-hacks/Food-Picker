import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardDetail from "./CardDetail";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        {/* <TouchableOpacity
          onPress={() => {
            setVisibility(true);
          }}
        > */}
        <Image
          style={{ width: 300, height: 250, borderRadius: 20 }}
          source={{
            uri: restaurant.image_url,
          }}
        />
        {/* </TouchableOpacity> */}
        <Text> </Text>
        <Text> </Text>
        <Button
          style={styles.text}
          title={restaurant.name}
          onPress={() => {
            setVisibility(true);
          }}
        />
      </View>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleChoice("yes", restaurant.id, navigation);
          }}
        >
          <Text style={styles.btnText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleChoice("no", restaurant.id, navigation);
          }}
        >
          <Text style={styles.btnText}>NO</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    position: "absolute",
    // width: screenWidth,
    // height: screenHeight,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: wp('90%'),
    height: hp('50%'),
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    shadowRadius: 25,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
  },
  btnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 425,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "salmon",
    marginLeft: 50,
    marginRight: 50,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
  },
});

export default Card;