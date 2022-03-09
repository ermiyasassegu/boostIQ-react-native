import React, {useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, StyleSheet, FlatList} from 'react-native';
import DataItem from './DataItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {appId} from '../utils/variables';

const SearchView = ({navigation, myFilesOnly = false}) => {
  const {loadMedia} = useMedia(myFilesOnly);
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');

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

  return (
    <View style={styles.view}>
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

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    margin: 10,
  },
});

SearchView.propTypes = {
  navigation: PropTypes.object,
};

export default SearchView;

/*    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

const filterData = async () => {
    try {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      const mediaData = await response.json();
      setFilteredDataSource(mediaData);
      setMasterDataSource(mediaData);
    } catch (error) {
      console.error(error.message);
    }
  };
   useEffect(() => {
    filterData()
  }, []);

 const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter( (item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  }; */

/* container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: theme?.colors?.background,
    marginBottom: hp('10%'),
  },
  searchView: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    width: width('90%'),
    borderColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  searchViewInput: {
    margin: 2,
    marginLeft: 5,
    color: theme?.colors?.text,
    width: wp('72%'),
  }, */
