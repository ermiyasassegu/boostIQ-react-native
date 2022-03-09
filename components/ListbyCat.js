import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import DataItem from './DataItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId} from '../utils/variables';
import {SearchBar} from 'react-native-elements';
import ListCategories from './ListCatagories';

const ListbyCat = ({navigation, myFilesOnly = false, route}) => {
  const {loadMedia, loading} = useMedia(myFilesOnly);
  const {category} = route.params;
  const [dataList, setDataList] = useState([]);
  const {update, setUpdate} = useContext(MainContext);
  const [search, setSearch] = useState('');

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
      if (category === 'All') getAllData(appId);

      getAllData(`${appId}_${category.toLowerCase()}`);
      setSearch(text);
    }
  };

  useEffect(() => {
    let appIdentfier = appId;
    if (
      category === 'General' ||
      category === 'Technology' ||
      category === 'Business' ||
      category === 'Programming' ||
      category === 'History' ||
      category === 'Management'
    ) {
      appIdentfier = `${appId}_${category.toLowerCase()}`;
      getAllData(appIdentfier);
    } else {
      getAllData(appIdentfier);
    }
  }, []);

  return (
    <View>
      <SearchBar
        round
        platform="android"
        cancelButtonTitle="Cancel"
        onChangeText={(text) => searchData(text)}
        value={search}
        containerStyle={{
          borderWidth: 0,
          borderRadius: 8,
          borderColor: 'darkblue',
          marginLeft: 15,
          marginRight: 5,
          backgroundColor: '#f7f9fc',
          borderRadius: 20,
        }}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          backgroundColor: 'white',
          padding: 10,
          height: 20,
        }}
      />

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
      ></FlatList>
    </View>
  );
};

ListbyCat.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default ListbyCat;
