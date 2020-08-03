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
  CONTAINER_PADDING_LEFT,
  CONTAINER_PADDING_RIGHT,
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

      <View>
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
              fontSize: hp(2),
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
              fontSize: hp(2.5),
              marginTop: hp(2.5),
              marginBottom: hp(1),
            }}
          >
            {restaurant.name} ({restaurant.price})
          </Text>
          <View style={styles.inline}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={restaurant.rating}
              fullStarColor={COLOR_PRIMARY}
              emptyStarColor={COLOR_PRIMARY}
              starSize={wp(4)}
            />
            <Text style={{ ...styles.txt, marginLeft: wp(3) }}>
              with {restaurant.review_count} reviews
            </Text>
          </View>

          <Text style={styles.txt}>
            Categories:{" "}
            {restaurant.categories.map((cat) => cat.title).join(", ")}
          </Text>
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
              description={restaurant.location.display_address.join("\n")}
            />
          </MapView>
          <Text
            style={{
              ...styles.txt,
              color: "salmon",
            }}
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
    marginTop: hp(5),
    marginLeft: CONTAINER_PADDING_LEFT,
    marginRight: CONTAINER_PADDING_RIGHT,
  },
  mapStyle: {
    width: "100%",
    height: hp(33),
    marginBottom: hp(2),
  },
  txt: {
    marginBottom: 20,
    fontFamily: FONT_NORMAL,
    fontSize: hp(1.75),
  },
  inline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "space-between",
  },
});

export default CardDetail;
