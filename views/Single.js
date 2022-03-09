import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  Card,
  Divider,
  ListItem,
  Text,
} from 'react-native-elements';
/* import {BottomSheetModal} from '@gorhom/bottom-sheet'; */
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import postIcons from '../utils/postIcons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import PostCommentForm from '../components/PostCommentForm';
import CommentLists from '../components/CommentLists';

const Single = ({route}) => {
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
      // TODO: check if user id of of logged in user is included in data and
      // set state userLike accordingly
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetchLikes() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (error) {
      // TODO: what to do if user has liked this image already?
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      // TODO: what to do if user has not liked this image already?
      console.error('removeFavourite error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  //console.log('likes', likes, 'userlike', userLike);
  const bottomSheetModalRef = useRef();
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ScrollView>
          <Card
            containerStyle={{
              borderRadius: 8,
              shadowOffset: 5,
              shadowOpacity: 0.5,
              backgroundColor: '#f7f9fc',
            }}
          >
            <ListItem containerStyle={{backgroundColor: '#f7f9fc'}}>
              <Image source={{uri: avatar}} style={styles.userImage} />
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {owner.username}
              </Text>
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
            <Card.Title h4>{file.title}</Card.Title>
            <Card.Title>{file.time_added}</Card.Title>
            <Card.Divider />
            <Text style={styles.description}>{file.description}</Text>
            <ListItem containerStyle={{backgroundColor: '#f7f9fc'}}>
              {!!likes.length && (
                <Text style={{fontSize: 10}}>
                  {likes.length}
                  {likes.length > 1 ? ' Likes' : ' Like '}
                </Text>
              )}
              {userLike ? (
                <TouchableOpacity
                  disabled={!userLike}
                  onPress={() => {
                    removeFavourite();
                  }}
                >
                  <Image
                    style={{width: 15, height: 15}}
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
                    style={{width: 15, height: 15}}
                    source={{uri: postIcons[0].imageUrl}}
                  />
                </TouchableOpacity>
              )}
            </ListItem>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : ''}
            >
              <PostCommentForm fileId={file.file_id} />
            </KeyboardAvoidingView>

            <Button onPress={handlePresentModalPress} title="show Comments" />

            {/* All comments */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
              index={0}
              enablePanDownToClose={true}
              onClose={() => setIsOpen(false)}
              backgroundComponent={({style}) => (
                <View style={[style, {backgroundColor: 'green'}]} />
              )}
            >
              <CommentLists fileId={file.file_id} />
            </BottomSheetModal>
          </Card>
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 260,
    aspectRatio: 1,
    borderRadius: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 80,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
