import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import DataItem from './DataItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId} from '../utils/variables';
import {SearchBar} from 'react-native-elements';

import {SafeAreaView} from 'react-native-safe-area-context';
import ListCategories from './ListCatagories';
import SearchView from './SearchView';

const List = ({navigation, myFilesOnly = false}) => {
  const {loadMedia, loading} = useMedia(myFilesOnly);
  const [dataList, setDataList] = useState([]);
  const {update, setUpdate} = useContext(MainContext);
  const [search, setSearch] = useState('');

  console.log('List load', loading);

  const getAllData = async (tag) => {
    try {
      const fetchData = await loadMedia(tag);
      setDataList(fetchData);
    } catch (error) {
      console.error('Error while Fetching Data', error.message);
    }
  };

  const searchData = (text) => {
    if (text) {
      const result = dataList.filter(function (item) {
        const title = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const serachText = text.toUpperCase();
        return title.indexOf(serachText) > -1;
      });
      setDataList(result);
      setSearch(text);
    } else {
      getAllData(appId);
      setSearch(text);
    }
  };

  useEffect(() => {
    getAllData(appId);
  }, [update]);

  return (
    <View>
      <SearchBar
        round
        platform="android"
        cancelButtonTitle="Cancel"
        onChangeText={(text) => searchData(text)}
        value={search}
        containerStyle={{
          marginLeft: 10,
          marginRight: 0,
          borderRadius: 0,
        }}
        style={{
          borderRadius: 15,
          borderWidth: 1,
          backgroundColor: 'white',
          padding: 10,
          height: 20,
        }}
      />
      <ListCategories navigation={navigation} />
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
    </View>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
