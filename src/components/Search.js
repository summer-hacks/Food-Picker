import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { Slider } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import { COLOR_PRIMARY } from "../common";

const url = "https://api.yelp.com/v3/businesses/search?";

const Search = ({ route, navigation }) => {
  // const { user } = route.params;
  const { partySize } = route.params;
  const { partyName } = route.params;

  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [maxRes, setMaxRes] = useState(0);
  const [dollars, setDollars] = useState([]);
  const [$clicked, set$] = useState(false);
  const [$$clicked, set$$] = useState(false);
  const [$$$clicked, set$$$] = useState(false);
  const [$$$$clicked, set$$$$] = useState(false);

  const getCurrLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      setLocation("Current Location");
    }
  };

  // helper functions to handle user input
  const onChangeLocation = (location) => {
    setLocation(location);
  };

  const onChangeRadius = (radius) => {
    setRadius(radius);
    // setRadius(Math.round(radius * 1609.34));
  };

  const onChangeMaxRes = (maxRes) => {
    setMaxRes(maxRes);
  };

  const handle$ = () => {
    Keyboard.dismiss();
    if ($clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 1));
    } else {
      setDollars((prev) => [...prev, 1]);
    }
    set$((prev) => !prev);
  };

  const handle$$ = () => {
    Keyboard.dismiss();
    if ($$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 2));
    } else {
      setDollars((prev) => [...prev, 2]);
    }
    set$$((prev) => !prev);
  };

  const handle$$$ = () => {
    Keyboard.dismiss();
    if ($$$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 3));
    } else {
      setDollars((prev) => [...prev, 3]);
    }
    set$$$((prev) => !prev);
  };

  const handle$$$$ = () => {
    Keyboard.dismiss();
    if ($$$$clicked) {
      setDollars((prev) => prev.filter((ele) => ele !== 4));
    } else {
      setDollars((prev) => [...prev, 4]);
    }
    set$$$$((prev) => !prev);
  };

  // get restaurant data via Yelp API (this is passed to the CreateRoom component and then stored in firebase)
  // submitting blank form raises error
  const getData = async (
    location,
    longitude,
    latitude,
    radius,
    maxRes,
    dollars
  ) => {
    const prices = dollars.join(",");
    if (!location || !radius || !maxRes) {
      Alert.alert(
        "Empty field",
        "Please enter all info",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      let full_url = "";
      if (location == "Current Location") {
        full_url =
          url +
          `latitude=${latitude}&longitude=${longitude}&radius=${Math.round(
            radius * 1609.34
          )}&categories=restaurants&limit=${maxRes}&price=${prices}`;
      } else {
        full_url =
          url +
          `location=${location}&radius=${Math.round(
            radius * 1609.34
          )}&categories=restaurants&limit=${maxRes}&price=${prices}`;
      }

      const res = await fetch(full_url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + global.yelp_api_key,
        },
      });
      const resJson = await res.json();
      return resJson.businesses;
    }
  };
  let defaultLocation = "";

  if (longitude && latitude) {
    defaultLocation = "Current Location";
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Current Location"
          // description={marker.description}
        />
      </MapView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="Location"
            style={styles.input}
            onChangeText={onChangeLocation}
            defaultValue={defaultLocation}
            value={location}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="CL" onPress={getCurrLocation} />
        </View>
      </View>

      {/* <TextInput
        placeholder="Radius (miles)"
        keyboardType={"numeric"}
        style={styles.input}
        onChangeText={onChangeRadius}
      /> */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        <Text>Max Distance</Text>
        <Text>{radius}</Text>
      </View>
      <Slider
        style={{ marginTop: -100, width: 300, height: 30 }}
        minimumValue={0}
        maximumValue={5}
        minimumTrackTintColor={COLOR_PRIMARY}
        maximumTrackTintColor={COLOR_PRIMARY}
        onValueChange={onChangeRadius}
        step={0.5}
        thumbTintColor={COLOR_PRIMARY}
      />

      <TextInput
        placeholder="Max Number of Restaurants"
        keyboardType={"numeric"}
        style={styles.input}
        onChangeText={onChangeMaxRes}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.dollar,
            backgroundColor: $clicked ? "salmon" : "white",
          }}
          onPress={handle$}
        >
          <Text
            style={{
              textAlign: "center",
              color: $clicked ? "white" : "salmon",
            }}
          >
            $
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.dollar,
            backgroundColor: $$clicked ? "salmon" : "white",
          }}
          onPress={handle$$}
        >
          <Text
            style={{
              textAlign: "center",
              color: $$clicked ? "white" : "salmon",
            }}
          >
            $$
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.dollar,
            backgroundColor: $$$clicked ? "salmon" : "white",
          }}
          onPress={handle$$$}
        >
          <Text
            style={{
              textAlign: "center",
              color: $$$clicked ? "white" : "salmon",
            }}
          >
            $$$
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.dollar,
            backgroundColor: $$$$clicked ? "salmon" : "white",
          }}
          onPress={handle$$$$}
        >
          <Text
            style={{
              textAlign: "center",
              color: $$$$clicked ? "white" : "salmon",
            }}
          >
            $$$$
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          const data = await getData(
            location,
            longitude,
            latitude,
            radius,
            maxRes,
            dollars
          );
          navigation.navigate("CreateRoom", {
            restaurants: data,
            partySize: partySize,
            partyName: partyName,
          });
        }}
      >
        <Text style={styles.btnText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    marginBottom: 100,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
  dollar: {
    height: 50,
    width: 50,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: COLOR_PRIMARY,
    borderStyle: "solid",
    borderWidth: 2,
  },
  mapStyle: {
    width: 0.9 * Dimensions.get("window").width,
    height: 0.33 * Dimensions.get("window").height,
  },
});

export default Search;
