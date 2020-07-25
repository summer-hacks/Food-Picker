import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import StarRating from "react-native-star-rating";
import {
  COLOR_PRIMARY,
  FONT_NORMAL,
  TEXTINPUT_BOTTOM_BORDER_WIDTH,
} from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CardDetail = ({ restaurant, closeCard }) => {
  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState([restaurant.image_url]);
  useEffect(() => {
    const res = fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + global.yelp_api_key,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => setPhotos(jsonRes.photos));
  }, []);
  return (
    <View style={styles.bigContainer}>
      <TouchableOpacity
        onPress={() => {
          setIndex((prev) => (prev + 1) % photos.length);
        }}
      >
        <Image
          style={{ width: screenWidth, height: 300 }}
          source={{
            uri: photos[index],
          }}
        />
      </TouchableOpacity>

      <View style={{}}>
        <TouchableOpacity
          style={{
            width: screenWidth,
            backgroundColor: "salmon",
            height: hp("5%"),
            justifyContent: "center",
          }}
          onPress={() => {
            closeCard(false);
          }}
        >
          <Text
            style={{
              fontFamily: FONT_NORMAL,
              textAlign: "center",
              color: "white",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: FONT_NORMAL,
              fontSize: 25,
              marginTop: 10,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            {restaurant.name} ({restaurant.price})
          </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={restaurant.rating}
            fullStarColor={COLOR_PRIMARY}
            emptyStarColor={COLOR_PRIMARY}
            starSize={25}
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
