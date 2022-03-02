import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={require('../assets/BoostIQ.png')} />
      </TouchableOpacity>

      <View style={styles.iconscontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Profile');
          }}
        >
          <Image
            style={styles.icon}
            source={require('../assets/profile.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  iconscontainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 80,
    resizeMode: 'contain',
  },
});
export default Header;
