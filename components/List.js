import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import DataItem from './DataItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId} from '../utils/variables';

const List = ({navigation, myFilesOnly = false}) => {
  const {loadMedia, loading} = useMedia(myFilesOnly);
  const [dataList, setDataList] = useState([]);
  const {update, setUpdate} = useContext(MainContext);

  console.log('List load', loading);

  const getAllData = async (tag) => {
    try {
      const fetchData = await loadMedia(tag);
      setDataList(fetchData);
    } catch (error) {
      console.error('Error while Fetching Data', error.message);
    }
  };

  useEffect(() => {
    getAllData(appId);
  }, [update]);

  return (
    <View>
      <Text style={{fontSize: 30, color: 'grey', margin: 10, padding: 5}}>
        Recently Added
      </Text>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.file_id?.toString()}
        renderItem={({item}) => (
          <DataItem
            navigation={navigation}
            singleMedia={item}
            myFilesOnly={myFilesOnly}
          />
        )}
        inverted
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
