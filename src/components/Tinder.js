import React, { useEffect, useState, createRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../../firebase.js';
import Stack from './Stack';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from "./Card";
import { COLOR_PRIMARY, COLOR_TERTIARY, COLOR_SECONDARY, FONT_BOLD, HEADING_FONT_SIZE } from '../common.js';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Transitioning, Transition } from 'react-native-reanimated'

const Tinder = ({ route, navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const { roomId } = route.params;

  // refs for Swiper 
  const swiperRef = createRef();
  const transitionRef = createRef();

  // const animation duration for transition
  const ANIMATION_DURATION = 200;

  // unused transition so far 
  const transition = (
    <Transition.Sequence>
      <Transition.Out type='slide-bottom' durationMs={ANIMATION_DURATION} interpolation='easeIn' />
      <Transition.Together>
        <Transition.In type='fade' durationMs={ANIMATION_DURATION} delayMs={ANIMATION_DURATION / 2} />
        <Transition.In type='slide-bottom' durationMs={ANIMATION_DURATION} delayMs={ANIMATION_DURATION / 2} interpolation="easeOut" />
      </Transition.Together>
    </Transition.Sequence>
  )

  // increments index for Swiper
  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setCardIndex((cardIndex + 1) % restaurants.length)
  }

  // get restaurant data from firebase for given room id (passed in from CreateRoom component)
  useEffect(() => {
    const resRef = firebase.database().ref('rooms/' + roomId + '/restaurants');
    const handleData = (snap) => {
      const restaurants = [];
      snap.forEach((res) => {
        restaurants.push(res.val());
      });

      if (restaurants) {
        setRestaurants(restaurants);
      }
      setRestaurants(restaurants)
    };

    // not sure what the purpose of the return is -- saw in tutorial
    resRef.once('value', handleData, (error) => alert(error));
    return () => {
      resRef.off('value', handleData);
    };
  }, []);


  // function that handles the yes/no user choice for each restaurant
  const handleChoice = (choice, id, navigation) => {
    const resRef = firebase
      .database()
      .ref('rooms/' + roomId + '/restaurants/' + id);

    // increment relevant field in firebase to keep count of choices
    resRef.once('value', (snap) => {
      if (snap.exists()) {
        if (choice === 'yes') {
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

    // remove restaurant from display list
    setRestaurants((prev) => prev.filter((res) => res.id !== id));

    // if no more restaurants left, update number of users completed for that room
    if (restaurants.length === 1) {
      const roomRef = firebase.database().ref('rooms/' + roomId);
      roomRef.once('value', (snap) => {
        if (snap.exists()) {
          roomRef.update({
            numCompleted: ++snap.val().numCompleted,
          });
        }
      });
      navigation.navigate('MyRooms');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Tinder Screen</Text>
      <Text>roomId: {roomId}</Text>
      <Text>{restaurants.length} remaining</Text>
      <View></View> */}
      <View style={styles.topContainer}>
        <Text style={{ fontFamily: FONT_BOLD, fontSize: HEADING_FONT_SIZE }}>Let's Choose!</Text>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          backgroundColor='white'
          cards={restaurants}
          cardIndex={cardIndex}
          renderCard={card => {
            if (card) {
              return (
                <Card
                  roomId={roomId}
                  restaurant={card}
                  handleChoice={handleChoice}
                  navigation={navigation} />
              )
            }
            // else {
            //   console.log(card);
            //   return (
            //     <View style={styles.fakeCard}>
            //       <Text>hey, card is undefined</Text>
            //     </View>)
            // }
          }}
          onSwiped={onSwiped}
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
        <Transitioning.View ref={transitionRef} transition={transition}>
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
        </Transitioning.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    // padding: 20,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: '#161a7e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  fakeCard: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  topContainer: {
    flex: 0.10,
    alignSelf: 'center',
    // bottom: heightPercentageToDP('50%')
  },
  swiperContainer: {
    flex: 0.55
  },
  bottomContainer: {
    flex: 0.15,
    // borderWidth: 5,
    top: heightPercentageToDP('12%'),
    justifyContent: 'space-evenly'
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default Tinder;
