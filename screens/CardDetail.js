import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import StarRating from "react-native-star-rating";
import firebase from "../firebase.js";

const CardDetail = ({ restaurant, closeCard }) => {
  return (
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
            closeCard(false);
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Close</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={{ fontSize: 25, marginTop: 10, marginBottom: 5 }}>
            {restaurant.name} ({restaurant.price})
          </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={restaurant.rating}
            fullStarColor="salmon"
            emptyStarColor="salmon"
            starSize={25}
            // containerStyle={{ marginBottom: 20 }}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Text style={{ marginBottom: 20 }}>
            with {restaurant.review_count} reviews
          </Text>
          <Text>
            Categories:{" "}
            {restaurant.categories.map((cat) => cat.title).join(", ")}
          </Text>
          <Text>Address: {restaurant.location.display_address.join("\n")}</Text>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: restaurant.coordinates.latitude,
              longitude: restaurant.coordinates.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: restaurant.coordinates.latitude,
                longitude: restaurant.coordinates.longitude,
              }}
              title={restaurant.name}
              // description={marker.description}
            />
          </MapView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    position: "absolute",
    marginTop: 40,
    marginLeft: 20,
  },
  mapStyle: {
    width: 0.33 * Dimensions.get("window").height,
    height: 0.33 * Dimensions.get("window").height,
  },
});

export default CardDetail;
