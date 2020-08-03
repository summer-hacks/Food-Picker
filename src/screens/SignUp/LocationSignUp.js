import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import MapView, { AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CONTAINER_PADDING_LEFT, CONTAINER_PADDING_RIGHT } from "../../common";
import NextButton from "../../components/NextButton";
import StepHeader from "../../components/StepHeader";
import StepTitleWithIcon from "../../components/StepTitleWithIcon";
import Container from "../../components/Container";
import StepSection from "../../components/StepSection";

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const LocationSignUp = ({ currentUser }) => {
  const [currentPosition, setCurrentPosition] = useState(initialState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert(JSON.stringify(position));
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleLogin = () => {
    currentUser.location = currentPosition;
    navigation.navigate("DoneSignUp");
  };

  // async function getCurrentLocation() {
  //   const { status, permissions } = await Permissions.askAsync(
  //     Permissions.LOCATION
  //   );
  //   if (status === 'granted') {
  //     console.log('GRANTED');
  //     const myLocation = await Location.getCurrentPositionAsync();
  //     setLocation(myLocation);
  //   } else {
  //     throw new Error('Location permission not granted');
  //   }
  // }

  const navigation = useNavigation();
  return currentPosition.latitude ? (
    <Container>
      <StepHeader step="Step 4 of 4" subscript="(last step!)" />
      <StepTitleWithIcon
        title="Where do you live?"
        iconName="map-marker-outline"
      />
      <StepSection>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            alignSelf: "center",
            width: wp("80%"),
            height: hp("30%"),
            borderRadius: 5,
          }}
          initialRegion={currentPosition}
          showsUserLocation
        ></MapView>
      </StepSection>
      <NextButton onPress={handleLogin} />
    </Container>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} animating size="large" />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingLeft: CONTAINER_PADDING_LEFT,
    paddingRight: CONTAINER_PADDING_RIGHT,
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(LocationSignUp);
