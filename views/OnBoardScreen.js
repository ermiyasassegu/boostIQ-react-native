import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../utils/colors';
import {PrimaryButton} from '../components/Button';

const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{height: 400}}>
        <Image
          style={style.logoImage}
          source={require('../assets/onboardImage.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text style={style.textHeader}>BoostIQ</Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              textAlign: 'center',
              top: -50,
              color: COLORS.grey,
            }}
          >
            Join the Community to add, share and boost your knowledge
          </Text>
        </View>
        {/* <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View> */}
        <PrimaryButton
          onPress={() => navigation.navigate('Login')}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  logoImage: {
    width: '50%',
    position: 'absolute',
    resizeMode: 'contain',
    top: -80,
    right: 50,
    margin: 30,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
    marginTop: 15,
  },
  textHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -50,
    color: COLORS.dark,
  },
  textSubHeader: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    top: -50,
    color: COLORS.grey,
  },
});

export default OnBoardScreen;
