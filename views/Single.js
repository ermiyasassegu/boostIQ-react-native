import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, Card, ListItem, Text} from 'react-native-elements';
import {Video} from 'expo-av';
import {useComment, useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import postIcons from '../utils/postIcons';
import {Navigation} from 'react-native-navigation';
import Comment from './Comment';

const Single = ({route, Navigation}) => {
  // console.log('route:', route);
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {postComment, getCommentsByFileId, deleteComment} = useComment();
  const [comments, setComments] = useState([]);
  const [userComment, setUserCommment] = useState(false);

  const {user} = useContext(MainContext);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      // notify for the User
      console.error('fetch owner error', error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      console.log('single.js avatar ', avatar);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      // To check if user id of of logged in user is included in data and
      // set state userLike accordingly
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      // notify error to user in the likes
      console.error('fetchLikes() error', error);
    }
  };
  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByFileId(file.file_id);
      setComments(commentsData);
      // To check if user id of of logged in user is included in data and
      // set state userLike accordingly
      commentsData.forEach((comment) => {
        comment.user_id === user.user_id && setUserCommment(true);
      });
    } catch (error) {
      // notify error to user in the likes
      console.error('fetchComments() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (error) {
      // error createFavourites
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      //if user has not liked this image error message
      console.error('removeFavourite error', error);
    }
  };

  const createComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postComment(file.file_id, token);
      response && setUserCommment(true);
    } catch (error) {
      // error createFavourites
      console.error('createComment error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [userLike, userComment]);

  //console.log('likes', likes, 'userlike', userLike);
  console.log('comments', comments, 'userComment', userComment);

  return (
    <ScrollView>
      <Card>
        <ListItem>
          <Avatar source={{uri: avatar}} style={styles.userImage} />
          <Text>{owner.username}</Text>
        </ListItem>
        <Card.Divider />
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadsUrl + file.filename,
            }}
            // usePoster not working in IOS..
            usePoster
            posterSource={{
              uri: uploadsUrl + file.screenshot,
            }}
            useNativeControls={true}
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.error('<Video> error', error);
            }}
          ></Video>
        )}
        <Card.Divider />
        <Card.Title h3>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{file.description}</Text>

        <ListItem>
          <View>
            {!!likes.length && (
              <Text>
                {likes.length}
                {likes.length > 1 ? ' Likes' : ' Like'}{' '}
              </Text>
            )}
          </View>
          {userLike ? (
            <TouchableOpacity
              disabled={!userLike}
              onPress={() => {
                removeFavourite();
              }}
            >
              <Image
                style={{width: 23, height: 23}}
                source={{uri: postIcons[0].likedImageUrl}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={userLike}
              onPress={() => {
                createFavourite();
              }}
            >
              <Image
                style={{width: 23, height: 23}}
                source={{uri: postIcons[0].imageUrl}}
              />
            </TouchableOpacity>
          )}
        </ListItem>
        <Comment Navigation={Navigation} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 80,
    aspectRatio: 4 / 3,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
