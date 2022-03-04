import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [input, setInput] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [textInput, setTextInput] = useState(null);

  const onCommentSend = () => {
    const textToSend = input;

    if (input.length == 0) {
      return;
    }
    setInput('');

    textInput.clear();
    setRefresh(true);
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({item}) => (
          <View>
            <Text>{item.Text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          ref={(input) => {
            setTextInput(input);
          }}
          value={input}
          multiline={true}
          style={[styles.fillHorizontal, styles.input, styles.container]}
          placeholder="comment..."
          onChangeText={(input) => setInput(input)}
        />

        <TouchableOpacity
          onPress={() => onCommentSend()}
          style={{width: 100, alignSelf: 'center'}}
        >
          <Text style={[styles.bold, styles.medium, styles.deepskyblue]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fillHorizontal: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  input: {
    flexWrap: 'wrap',
  },
  bold: {
    fontWeight: '700',
  },
  medium: {
    fontSize: 15, //'large'
    marginBottom: 10,
  },
  deepskyblue: {
    color: 'deepskyblue',
  },
});
export default Comment;
