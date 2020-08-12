import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import firebase from '../../firebase.js';
import Modal from 'react-native-modal';
import CardDetail from '../components/CardDetail';
import Container from '../components/Container';
import BigHeader from '../components/BigHeader';
import StepHeader from '../components/StepHeader';
import {
  FONT_NORMAL,
  COLOR_PRIMARY,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../common.js';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function RoomPage({ route, navigation }) {
  const { room } = route.params;
  const [matches, setMatches] = useState([]);
  const [index, setIndex] = useState(0);
  const [numCompleted, setCompleted] = useState(0);
  const [partySize, setSize] = useState(0);
  const [visibility, setVisibility] = useState(false);

  // get matches if everyone has finished swiping
  useEffect(() => {
    const roomRef = firebase.database().ref('rooms/' + room.roomId);
    roomRef.once('value', (snap) => {
      const room = snap.val();
      setCompleted(room.numCompleted);
      setSize(room.partySize);
      if (room.numCompleted === room.partySize) {
        const restaurants = [];
        Object.keys(room.restaurants).forEach((key) => {
          restaurants.push(room.restaurants[key]);
        });
        const matches = restaurants.filter((res) => res.yes === room.partySize);
        setMatches(matches.map((match, index) => ({ ...match, index })));
      }
    });
  }, []);
  // displays matches in a list if all users have finished swiping (a completed room)
  return (
    <Container>
      <BigHeader title={room.name + '\n(' + room.roomId + ')'} />
      {numCompleted === partySize ? (
        <StepHeader step='Here are your matches!' />
      ) : (
        <View style={styles.animationContainer}>
          <StepHeader
            step={`Still waiting on ${partySize - numCompleted} people...`}
          />
          <LottieView
            autoPlay={true}
            style={{
              width: 400,
              height: 400,
              backgroundColor: 'white',
            }}
            source={require('../../assets/7093-roll-it-chicken-roll.json')}
          />
        </View>
      )}
      {numCompleted === partySize ? (
        <View>
          <Modal
            isVisible={visibility}
            backdropOpacity={1}
            backdropColor='white'
            height={DEVICE_HEIGHT}
            width={DEVICE_WIDTH}
          >
            <View style={{ flex: 1, margin: -20.75 }}>
              <CardDetail
                restaurant={matches[index]}
                closeCard={setVisibility}
              />
            </View>
          </Modal>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.inline}
                onPress={() => {
                  setIndex(item.index);
                  setVisibility(true);
                }}
              >
                <Icon
                  color={COLOR_PRIMARY}
                  name='heart'
                  size={heightPercentageToDP(1.5)}
                  style={{
                    marginRight: widthPercentageToDP(3),
                    marginBottom: heightPercentageToDP(4),
                  }}
                />
                <Text style={styles.txt}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <Text style={styles.txt}></Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: FONT_NORMAL,
    fontSize: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(4),
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
});
export default RoomPage;
