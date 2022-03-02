import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ButtonGroup, Divider, ListItem} from 'react-native-elements';
import {Alert, TouchableOpacity, View, Image} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import postIcons from '../utils/postIcons';

const DataItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const doDelete = () => {
    Alert.alert('Delete', 'this file is permanently Deleted', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const PostFooter = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Icon
        imgStyle={{width: 23, height: 23}}
        imgUrl={postIcons[0].likedImageUrl}
      />
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Icon
          imgStyle={{width: 23, height: 23}}
          imgUrl={postIcons[1].imageUrl}
        />
      </View>
    </View>
  );

  const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
      <Image style={imgStyle} source={{uri: imgUrl}} />
    </TouchableOpacity>
  );

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Avatar
        size="large"
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      ></Avatar>
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </ListItem.Title>
        <Divider padding={5} width={1} orientation="vertical" />
        <ListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </ListItem.Subtitle>
        <PostFooter />
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                //Alert.alert('The file is Modified');
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

DataItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default DataItem;
