import {View, Alert, StyleSheet, LogBox} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import {Input} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import COLORS from '../utils/colors';

const PostCommentForm = ({fileId}) => {
  const {postComment} = useComment(fileId);
  const {commentUpdate, setCommentUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({defaultValues: {comment: ''}});

  const reset = () => {
    setValue('comment', '');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const onSubmit = async (comment) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!comment.comment.trim()) {
        return;
      }

      const response = await postComment(
        {file_id: fileId, comment: comment.comment},
        token
      );
      response &&
        Alert.alert('Comment', 'Your Comment has been Added', [
          {
            text: 'OK',
            onPress: async () => {
              reset();
              setCommentUpdate(commentUpdate + 1);
            },
          },
        ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 1,
            message: 'Please write something before sending.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{
              backgroundColor: '#f7f9fc',
              borderWidth: 0.5,
              borderRadius: 8,
              margin: 0,
            }}
            rightIcon={{
              type: 'font-awesome',
              name: 'share',
              size: 20,
              color: COLORS.darkOrange,
              onPress: handleSubmit(onSubmit),
            }}
            style={{padding: 8, fontSize: 12}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Add a comment . . ."
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="comment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputBox: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 38,
  },
});

PostCommentForm.propTypes = {
  navigation: PropTypes.object,
};

export default PostCommentForm;
