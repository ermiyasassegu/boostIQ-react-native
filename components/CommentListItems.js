import {Text, View, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {List, IconButton} from 'react-native-paper';
import {useUser, useComment} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import COLORS from '../utils/colors';

const CommentListItems = ({comment}) => {
  const {getUserById} = useUser();
  const {deleteComment} = useComment();
  const [commentOwner, setCommentOwner] = useState({username: 'fetching...'});
  const {user} = useContext(MainContext);
  const {commentUpdate, setCommentUpdate} = useContext(MainContext);

  const fetchCommentOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(comment.user_id, token);
      setCommentOwner(userData);
    } catch (error) {
      console.error('fetchCommentOwner error ', error.message);
      setCommentOwner({username: '[not available]'});
    }
  };

  const removeComment = async () => {
    Alert.alert(
      'Delete',
      'Commet will be DELETED permanently. \n Are you sure you want to delete your comment',
      [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const response = await deleteComment(comment.comment_id, token);
              response && setCommentUpdate(commentUpdate + 1);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchCommentOwner();
  }, []);

  return (
    <List.Item
      title={commentOwner.username}
      titleStyle={{fontSize: 15, fontWeight: '500'}}
      description={
        <View style={{alignSelf: 'center'}}>
          <Text>{comment.comment}</Text>
        </View>
      }
      /*       left={() => <AvatarComponent userId={comment.user_id} />}
       */ right={() => (
        <>
          <Text
            style={{
              position: 'absolute',
              //top: 7,
              right: 0,
            }}
          ></Text>
          {commentOwner.user_id === user.user_id && (
            <IconButton
              icon="delete"
              color={COLORS.darkOrange}
              size={15}
              style={{marginTop: 15}}
              onPress={() => {
                removeComment();
              }}
            />
          )}
        </>
      )}
      style={{padding: 5}}
    />
  );
};

export default CommentListItems;