import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_PRIMARY,
  FONT_NORMAL,
  DEVICE_WIDTH,
  FONT_BOLD,
  COLOR_GREY_TEXT,
} from '../common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CardDetail = ({ restaurant, closeCard }) => {
  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState([restaurant.image_url]);
  useEffect(() => {
    const res = fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + global.yelp_api_key,
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
          style={{ width: DEVICE_WIDTH, height: hp('38%') }}
          source={{
            uri: photos[index],
          }}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Icon
          color={COLOR_PRIMARY}
          name='chevron-down'
          size={hp('5%')}
          style={{
            marginTop: hp('1%'),
            marginLeft: wp('2.5%'),
            position: 'absolute',

            alignSelf: 'flex-start',
          }}
          onPress={() => {
            closeCard(false);
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'flex-end',
          }}
        >
          <Icon
            color={COLOR_PRIMARY}
            name='star'
            size={hp('2%')}
            style={{ marginRight: 3 }}
          />
          <Text>
            <Text style={{ fontWeight: 'bold' }}>
              {restaurant.rating.toFixed(1)}{' '}
            </Text>
            <Text style={{ color: 'black' }}>({restaurant.review_count})</Text>
          </Text>
        </View>

        <Text
          style={{
            fontFamily: FONT_NORMAL,
            fontSize: hp(3),
            marginTop: hp(2.5),
          }}
        >
          {restaurant.name}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: COLOR_PRIMARY,
            marginBottom: hp('1.5%'),
          }}
        >
          {restaurant.categories[0].title}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: -hp('0.5%'),
          }}
        >
          <Text style={{ color: COLOR_GREY_TEXT }}>
            {restaurant.location.display_address[0]}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              bottom: 3,
            }}
          >
            <Text style={{ color: COLOR_GREY_TEXT }}>
              {
                restaurant.location.display_address[
                  restaurant.location.display_address.length - 1
                ]
              }
            </Text>
            <Icon
              color={COLOR_GREY_TEXT}
              name='circle-small'
              size={hp('3%')}
              onPress={() => {
                closeCard(false);
              }}
            />
            <Text style={{ color: COLOR_GREY_TEXT }}>
              {(restaurant.distance * 0.000621371192).toFixed(2)} mi{' '}
            </Text>
          </View>
        </View>

        <Text
          style={{
            ...styles.txt,
            color: 'black',
            marginBottom: hp('4%'),
          }}
          onPress={() => Linking.openURL(restaurant.url)}
        >
          Open in Yelp
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
            description={restaurant.location.display_address.join('\n')}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
  },
  container: {
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    top: hp('35%'),
    width: '100%',
    height: '100%',
    paddingLeft: hp('4.0%'),
    paddingRight: hp('4.0%'),
    paddingBottom: hp('4.0%'),
    paddingTop: hp('2.5%'),
    // alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  mapStyle: {
    width: '100%',
    height: hp(30),
    marginBottom: hp(2),
    borderRadius: 2,
  },
  txt: {
    marginBottom: 20,
    fontFamily: FONT_BOLD,
    fontSize: hp(1.8),
    textDecorationLine: 'underline',
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default CardDetail;
