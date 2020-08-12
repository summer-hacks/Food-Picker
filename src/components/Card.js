import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLOR_PRIMARY } from '../common';

const Card = ({ roomId, restaurant, navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          bottom: hp('4.5%'),
          height: hp('40%'),
          width: '100%',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
        source={{
          uri: restaurant.image_url,
        }}
      />

      <View
        style={{
          padding: 10,
          bottom: hp('3%'),
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: COLOR_PRIMARY,
            fontWeight: 'bold',
            marginBottom: hp('1.25%'),
          }}
        >
          {restaurant.categories[0].title} - {restaurant.price}
        </Text>
        <Text style={[styles.text, { marginBottom: hp('0.5%') }]}>
          {restaurant.name}{' '}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon
            color={COLOR_PRIMARY}
            name='star'
            size={hp(1.75)}
            style={{ alignSelf: 'center' }}
          />
          <Text style={{ fontWeight: 'bold', marginLeft: 3 }}>
            {restaurant.rating.toFixed(1)}
          </Text>
          <Text style={{ color: '#808080' }}> ({restaurant.review_count})</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'karla-regular',
    fontSize: hp('3%'),
  },
  container: {
    flex: 1,
    width: wp('85%'),
    height: hp('50%'),
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
  },
  btnContainer: {
    marginTop: hp('50%'),
    width: wp('70%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: wp('20%'),
    height: wp('20%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default Card;
