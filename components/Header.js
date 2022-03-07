import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/variables';

const Header = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);

  const [avatar, setAvatar] = useState('http://placekitten.com/610');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </TouchableOpacity>

      <View style={styles.iconscontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Profile');
          }}
        >
          <Image style={styles.icon} source={{uri: avatar}} />
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
    width: '100%',
  },
  iconscontainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 80,
  },
});
export default Header;
