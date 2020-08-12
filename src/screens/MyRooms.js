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
} from 'react-native';
import firebase from '../../firebase.js';
import BigHeader from '../components/BigHeader';
import StepHeader from '../components/StepHeader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  COLOR_PRIMARY_LIGHT,
  COLOR_SECONDARY,
  FONT_NORMAL,
  COLOR_PRIMARY,
  COLOR_TERTIARY,
  FONT_BOLD,
  COLOR_GREY_TEXT,
  HEADING_FONT_SIZE,
} from '../common';
import Swipeout from 'react-native-swipeout';

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
        <Text
          style={{
            fontFamily: FONT_BOLD,
            fontSize: HEADING_FONT_SIZE,
            marginLeft: 30,
            marginBottom: 30,
          }}
        >
          My Parties
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: 'relative',
            bottom: 30,
            width: '85%',
            alignSelf: 'center',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: COLOR_PRIMARY_LIGHT,
              borderRadius: 10,
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
              style={{
                fontFamily: FONT_NORMAL,
                fontSize: 16,
                color: active === 0 ? 'white' : COLOR_PRIMARY,
              }}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inactiveTab}
            onLayout={(event) => setxTabTwo(event.nativeEvent.layout.x)}
            onPress={() => changeToInactive()}
          >
            <Text
              style={{
                fontFamily: FONT_NORMAL,
                fontSize: 16,
                color: active === 1 ? COLOR_TERTIARY : COLOR_PRIMARY,
              }}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ height: '100%', bottom: 40, paddingTop: 35 }}>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ translateX: translateXTabOne }],
              width: '100%',
            }}
            onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: widthPercentageToDP(100),
              }}
            >
              {rooms.length > 0 ? (
                rooms
                  .filter((room) => room.completed !== room.size)
                  .map((item) => (
                    <Swipeout
                      key={item.roomId}
                      right={swipeoutBtns}
                      style={styles.btnView}
                      onOpen={() => {
                        setActive(item.roomId);
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          ...styles.btn,
                          backgroundColor: COLOR_SECONDARY,
                        }}
                        onPress={() => {
                          navigation.navigate('RoomPage', { room: item });
                        }}
                      >
                        <Text style={{ ...styles.btnText, color: 'black' }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            ...styles.btnText,
                            color: COLOR_GREY_TEXT,
                            fontSize: heightPercentageToDP('1.75'),
                          }}
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
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: widthPercentageToDP(100),
              }}
            >
              {rooms.length > 0 ? (
                rooms
                  .filter((room) => room.completed === room.size)
                  .map((item) => (
                    <Swipeout
                      key={item.roomId}
                      right={swipeoutBtns}
                      style={styles.btnView}
                      onOpen={() => {
                        setActive(item.roomId);
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          ...styles.btn,
                          backgroundColor: COLOR_PRIMARY_LIGHT,
                        }}
                        onPress={() => {
                          navigation.navigate('RoomPage', { room: item });
                        }}
                      >
                        <Text style={{ ...styles.btnText, color: 'white' }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            ...styles.btnText,
                            color: 'white',
                            fontSize: heightPercentageToDP('1.75'),
                          }}
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
        </ScrollView>
      </View>
    </View>
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
    width: '75%',
    margin: heightPercentageToDP('.5'),
    borderRadius: 10,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: heightPercentageToDP('2.5'),
    marginRight: 10,
    marginLeft: 10,
    fontFamily: FONT_NORMAL,
    textAlign: 'left',
    marginTop: 2,
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_PRIMARY_LIGHT,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 10,
  },
  inactiveTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_PRIMARY_LIGHT,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRadius: 10,
  },
});
export default MyRooms;
