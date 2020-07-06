import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({ roomId, restaurant, handleChoice, navigation }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <View style={styles.bigContainer}>
      <Overlay
        isVisible={visibility}
        overlayBackgroundColor="red"
        fullScreen={true}
      >
        <View style={styles.bigContainer}>
          <Image
            style={{ width: screenWidth, height: 300 }}
            source={{
              uri: restaurant.image_url,
            }}
          />
          <View style={{}}>
            <TouchableOpacity
              style={{
                width: screenWidth,
                backgroundColor: "salmon",
                height: 30,
                justifyContent: "center",
              }}
              onPress={() => {
                setVisibility(false);
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Close</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 20, fontSize: 30 }}>
              {restaurant.name}
            </Text>
            <Text>
              {restaurant.rating} stars with {restaurant.review_count} reviews
            </Text>
            <Text>Price: {restaurant.price}</Text>
            <Text>Address: {restaurant.location.display_address}</Text>
            <Text>
              Categories: {restaurant.categories.map((cat) => cat.title)}
            </Text>
          </View>
        </View>
      </Overlay>
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 250 }}
          source={{
            uri: restaurant.image_url,
          }}
        />
        <Text> </Text>
        <Text> </Text>
        <Button
          style={styles.text}
          title={restaurant.name}
          onPress={() => {
            setVisibility(true);
            console.log(restaurant);
            // navigation.navigate("CardDetail", {
            //   roomId: roomId,
            //   resId: restaurant.id,
            // });
          }}
        />
      </View>
      <View style={styles.btnContainer}>
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
    // width: screenWidth,
    // height: screenHeight,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 300,
    height: 400,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 30,
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
