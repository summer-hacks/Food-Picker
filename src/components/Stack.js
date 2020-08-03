import React, { useEffect, useState, createRef } from "react";
import { View, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import CardDetail from "./CardDetail";
import StepHeader from "./StepHeader";

import Card from "./Card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLOR_TERTIARY, COLOR_SECONDARY, COLOR_PRIMARY } from '../common.js';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../../firebase.js";



const Stack = ({ cards, roomId, nav }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = createRef();
  const [visibility, setVisibility] = useState(false);
  // function that handles the yes/no user choice for each restaurant
  const handleChoice = (roomId, cards, cardIndex, navigation, direction) => {
    const resRef = firebase
      .database()
      .ref("rooms/" + roomId + "/restaurants/" + cards[cardIndex].id);

    // increment relevant field in firebase to keep count of choices
    resRef.once("value", (snap) => {
      if (snap.exists()) {
        if (direction === "right") {
          resRef.update({
            yes: ++snap.val().yes,
          });
        } else {
          resRef.update({
            no: ++snap.val().no,
          });
        }
      }
    });

    // if no more restaurants left, update number of users completed for that room
    if (cardIndex === cards.length - 1) {
      const roomRef = firebase.database().ref("rooms/" + roomId);
      roomRef.once("value", (snap) => {
        if (snap.exists()) {
          roomRef.update({
            numCompleted: ++snap.val().numCompleted,
          });
        }
      });
      navigation.navigate("MyRooms");
    }

    setCardIndex(prev => prev + 1)

  };
  return (
    <View style={styles.container}>
      <StepHeader step={(cards.length - cardIndex) + " cards left"} />
      <Overlay
        isVisible={visibility}
        fullScreen={true}
      >
        <CardDetail restaurant={cards[cardIndex]} closeCard={setVisibility} />
      </Overlay>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          backgroundColor='white'
          cards={cards}
          cardIndex={cardIndex}
          renderCard={card => {
            if (card) {
              return (
                <Card
                  roomId={roomId}
                  restaurant={card}
                  navigation={nav} />
              )
            }
          }}
          onSwipedLeft={() => handleChoice(roomId, cards, cardIndex, nav, "left")}
          onSwipedRight={() => handleChoice(roomId, cards, cardIndex, nav, "right")}
          onTapCard={(index) => setVisibility(true)}
          stackSize={4}
          stackScale={10}
          stackSeparation={14}
          disableTopSwipe
          disableBottomSwipe
          animateOverlayLabelsOpacity
          // animateCardOpacity
          infinite
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: COLOR_TERTIARY,
                  color: COLOR_PRIMARY,
                  fontSize: 25,
                  borderRadius: 20,
                  position: 'absolute'
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            right: {
              title: 'YEP',
              style: {
                label: {
                  backgroundColor: COLOR_TERTIARY,
                  color: 'black',
                  fontSize: 25,
                  borderRadius: 20,
                  position: 'absolute'
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            }
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        {/* <Transitioning.View ref={transitionRef} transition={transition}> */}
        <View style={styles.bottomButtonsContainer}>
          <Icon.Button
            name='close-circle-outline'
            size={90}
            backgroundColor='transparent'
            underlayColor='transparent'
            activeOpacity={0.3}
            color={COLOR_PRIMARY}
            onPress={() => swiperRef.current.swipeLeft()} />
          <Icon.Button
            name='check-circle-outline'
            size={90}
            backgroundColor='transparent'
            underlayColor='transparent'
            activeOpacity={0.3}
            color={COLOR_SECONDARY}
            onPress={() => swiperRef.current.swipeRight()} />
        </View>
        {/* </Transitioning.View> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -hp("10%"),
    width: wp('100%'),
    borderRadius: 10,

  },
  bottomContainer: {
    flex: 0.15,
    // borderWidth: 5,
    top: hp('12%'),
    justifyContent: 'space-evenly'

  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  swiperContainer: {
    flex: 0.55,
    // borderWidth: 3
  },
});

export default Stack;
