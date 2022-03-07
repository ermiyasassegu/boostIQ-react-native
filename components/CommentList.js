import {FlatList, View, StyleSheet, Text} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import CommentListItems from './CommentListItems';

const CommentList = ({fileId}) => {
  const {getCommentsByFileId} = useComment();
  const [comments, setComments] = useState([]);
  const {commentUpdate, setCommentUpdate} = useContext(MainContext);

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByFileId(fileId);
      setComments(commentsData);
    } catch (error) {
      console.error('fetchComments error', error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [commentUpdate]);

  return (
    <View
      style={{
        height: '100%',
        marginTop: 5,
      }}
    >
      <Text style={styles.commentTitle}>{comments.length} Comments </Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.comment_id.toString()}
        renderItem={({item}) => <CommentListItems comment={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentTitle: {fontSize: 16, fontWeight: '700', paddingBottom: 5},
});

CommentList.propTypes = {
  fileId: PropTypes.number,
};

export default CommentList;
