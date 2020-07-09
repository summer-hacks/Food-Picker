import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import StarRating from "react-native-star-rating";
import firebase from "../firebase.js";

const CardDetail = ({ restaurant, closeCard }) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.bigContainer}>
      <TouchableOpacity
        onPress={() => {
          setIndex((prev) => (prev + 1) % restaurant.photos.length);
        }}
      >
        <Image
          style={{ width: screenWidth, height: 300 }}
          source={{
            uri: restaurant.photos[index],
          }}
        />
      </TouchableOpacity>

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
            provider={PROVIDER_GOOGLE}
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
          {/* <TouchableOpacity style={{width: screenWidth,
            backgroundColor: "salmon",}}>

          </TouchableOpacity> */}
          <Text
            style={{ color: "salmon", fontSize: 20, marginTop: 20 }}
            onPress={() => Linking.openURL(restaurant.url)}
          >
            Open in Yelp
          </Text>
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
    marginRight: 20,
  },
  mapStyle: {
    width: 0.9 * Dimensions.get("window").width,
    height: 0.33 * Dimensions.get("window").height,
  },
});

export default CardDetail;
