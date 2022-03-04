import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {Card, Text, Button, ListItem, Avatar} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/610');
  const {getFilesByTag} = useTag();
  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      if (avatarArray.length === 0) {
        return;
      }
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
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
        <ListItem style={{flexDirection: 'row'}}>
          <Card.Image
            source={{uri: avatar}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Button
            title="Edit Profile"
            onPress={() => {
              navigation.navigate('Edit Profile');
            }}
          />
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'email', color: 'black'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>
        <ListItem style={{alignSelf: 'center'}}>
          <Button
            title="Log out!"
            onPress={async () => {
              await AsyncStorage.clear();
              setIsLoggedIn(false);
            }}
          />

          <Button
            title="My Files"
            onPress={() => {
              navigation.navigate('My Files');
            }}
          />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    width: 70,
    height: 70,
    borderRadius: 50,
    aspectRatio: 4 / 3,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
