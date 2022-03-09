import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import DataItem from './DataItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId} from '../utils/variables';

const List = ({navigation, myFilesOnly = false}) => {
  const {loadMedia} = useMedia(myFilesOnly);
  const [dataList, setDataList] = useState([]);
  //console.log('Loadmedia', loadMedia);

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
  }, [dataList]);
  return (
    <FlatList
      data={dataList}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <DataItem
          navigation={navigation}
          singleMedia={item}
          myFilesOnly={myFilesOnly}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
