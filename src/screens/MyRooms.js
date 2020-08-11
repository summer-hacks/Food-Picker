import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  Animated,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import firebase from "../../firebase.js";
import { COLOR_PRIMARY_LIGHT, COLOR_SECONDARY, FONT_NORMAL } from "../common";
import Container from "../components/Container";
import BigHeader from "../components/BigHeader";
import StepHeader from "../components/StepHeader";
import { heightPercentageToDP } from "react-native-responsive-screen";
import firebase from '../../firebase.js';
import {
  COLOR_PRIMARY_LIGHT,
  COLOR_SECONDARY,
  FONT_NORMAL,
  COLOR_PRIMARY,
  COLOR_GREY_TEXT,
  COLOR_TERTIARY,
  DEVICE_WIDTH,
} from '../common';
import Container from '../components/Container';
import BigHeader from '../components/BigHeader';
import StepHeader from '../components/StepHeader';
import Swipeout from 'react-native-swipeout';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

function MyRooms({ route, navigation }) {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomIds, setRoomIds] = useState([]);
  const [activeRoom, setActive] = useState(0);

  /* Tab Animation */
  const [active, setActiveTab] = useState(0);
  const [xTabOne, setxTabOne] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const [translateX] = useState(new Animated.Value(0));
  const [translateXTabOne] = useState(new Animated.Value(0));
  const [translateXTabTwo] = useState(new Animated.Value(width));

  const [translateY, setTranslateY] = useState(-1000);

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
    }).start();

    if (active === 0) {
      console.log('active');
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      console.log('inactive');
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
        }).start(),
      ]);
    }
  };

  const changeToActive = () => {
    setActiveTab(0);
    handleSlide(xTabOne);
  };

  const changeToInactive = () => {
    setActiveTab(1);
    handleSlide(xTabTwo);
  };

  // notifications
  // let currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      const userRef = firebase.database().ref('users/' + currentUser.uid);
      userRef.once('value', async (snap) => {
        if (snap.val().rooms) {
          const promises = await Promise.all(
            snap.val().rooms.map(async (room) => {
              const roomRef = firebase.database().ref('rooms/' + room);
              let name = '';
              let size = 0;
              let completed = 0;
              let date = {};
              await roomRef.once('value', (snap) => {
                const res = snap.val();
                name = res.partyName;
                size = res.partySize;
                completed = res.numCompleted;
                date = new Date(res.timestamp);
              });
              return {
                roomId: room,
                name: name,
                size: size,
                completed: completed,
                date: `${date.getMonth() + 1}/${date.getDate()}/${
                  date.getFullYear() - 2000
                }`,
              };
            })
          );
          setRooms(promises);
        }
      });
    }
  }, [roomIds]);

  useEffect(() => {
    if (active === 0) {
      handleSlide(xTabOne);
    } else {
      handleSlide(xTabTwo);
    }
  }, [active]);

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this room? This will not impact anyone else.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const userRef = firebase
              .database()
              .ref('users/' + firebase.auth().currentUser.uid);
            userRef.once(
              'value',
              (snap) => {
                const remaining = snap
                  .val()
                  .rooms.filter((ele) => ele !== activeRoom);
                userRef.update({
                  rooms: remaining,
                });
                setRoomIds(remaining);
              },
              (error) => alert(error)
            );
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const swipeoutBtns = [
    {
      text: 'Delete',
      onPress: handleDelete,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <BigHeader title='My Rooms' />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: 'relative',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: COLOR_PRIMARY,
              borderRadius: 4,
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={styles.activeTab}
            onLayout={(event) => setxTabOne(event.nativeEvent.layout.x)}
            onPress={() => changeToActive()}
          >
            <Text
              style={{ color: active === 0 ? COLOR_TERTIARY : COLOR_PRIMARY }}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inactiveTab}
            onLayout={(event) => setxTabTwo(event.nativeEvent.layout.x)}
            onPress={() => changeToInactive()}
          >
            <Text
              style={{ color: active === 1 ? COLOR_TERTIARY : COLOR_PRIMARY }}
            >
              Inactive
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ translateX: translateXTabOne }],
            }}
            onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
          >
            <View style={{ flex: 1 }}>
              {rooms.length > 0 ? (
                rooms.map((item) => (
                  <Swipeout
                    key={item.roomId}
                    right={swipeoutBtns}
                    style={styles.btnView}
                    onOpen={() => {
                      setActive(item.roomId);
                    }}
                  >
                    <TouchableOpacity
                      style={
                        item.completed === item.size
                          ? {
                              ...styles.btn,
                              backgroundColor: COLOR_PRIMARY_LIGHT,
                            }
                          : {
                              ...styles.btn,
                              backgroundColor: COLOR_SECONDARY,
                            }
                      }
                      onPress={() => {
                        navigation.navigate('RoomPage', { room: item });
                      }}
                    >
                      <Text
                        style={
                          item.completed === item.size
                            ? { ...styles.btnText, color: 'white' }
                            : { ...styles.btnText, color: 'black' }
                        }
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={
                          item.completed === item.size
                            ? {
                                ...styles.btnText,
                                color: 'white',
                                fontSize: heightPercentageToDP('2'),
                              }
                            : {
                                ...styles.btnText,
                                color: 'black',
                                fontSize: heightPercentageToDP('2'),
                              }
                        }
                      >
                        {item.date}
                      </Text>
                    </TouchableOpacity>
                  </Swipeout>
                ))
              ) : (
                <StepHeader step='no rooms yet!' />
              )}
            </View>
          </Animated.View>

          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                { translateX: translateXTabTwo },
                { translateY: -translateY },
              ],
            }}
          >
            <Text>Hi, I am cute dog</Text>
            <View style={{ marginTop: 20 }}>
              <Image
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
    // <Container>
    //   <BigHeader title='My Rooms' />
    //   <View style={{ flex: 1 }}>
    //     {rooms.length > 0 ? (
    //       rooms.map((item) => (
    //         <Swipeout
    //           key={item.roomId}
    //           right={swipeoutBtns}
    //           style={styles.btnView}
    //           onOpen={() => {
    //             setActive(item.roomId);
    //           }}
    //         >
    //           <TouchableOpacity
    //             style={
    //               item.completed === item.size
    //                 ? { ...styles.btn, backgroundColor: COLOR_PRIMARY_LIGHT }
    //                 : { ...styles.btn, backgroundColor: COLOR_SECONDARY }
    //             }
    //             onPress={() => {
    //               navigation.navigate('RoomPage', { room: item });
    //             }}
    //           >
    //             <Text
    //               style={
    //                 item.completed === item.size
    //                   ? { ...styles.btnText, color: 'white' }
    //                   : { ...styles.btnText, color: 'black' }
    //               }
    //             >
    //               {item.name}
    //             </Text>
    //             <Text
    //               style={
    //                 item.completed === item.size
    //                   ? {
    //                       ...styles.btnText,
    //                       color: 'white',
    //                       fontSize: heightPercentageToDP('2'),
    //                     }
    //                   : {
    //                       ...styles.btnText,
    //                       color: 'black',
    //                       fontSize: heightPercentageToDP('2'),
    //                     }
    //               }
    //             >
    //               {item.date}
    //             </Text>
    //           </TouchableOpacity>
    //         </Swipeout>
    //       ))
    //     ) : (
    //       <StepHeader step='no rooms yet!' />
    //     )}
    //   </View>
    // </Container>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: '100%',
    padding: heightPercentageToDP('1'),
  },
  btnView: {
    height: heightPercentageToDP('8'),
    margin: heightPercentageToDP('.5'),
    borderRadius: 10,
  },
  btnText: {
    fontSize: heightPercentageToDP('2.5'),
    marginRight: 10,
    marginLeft: 10,
    fontFamily: FONT_NORMAL,
    textAlign: 'left',
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_PRIMARY,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 4,
  },
  inactiveTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_PRIMARY,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRadius: 4,
  },
});
export default MyRooms;
