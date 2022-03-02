import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import DataItem from './DataItem';
import PropTypes from 'prop-types';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray, loading} = useMedia(myFilesOnly);
  console.log('List load', loading);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <DataItem
          navigation={navigation}
          singleMedia={item}
          myFilesOnly={myFilesOnly}
        />
      )}
    ></FlatList>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
