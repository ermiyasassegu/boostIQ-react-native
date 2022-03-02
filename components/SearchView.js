import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../utils/colors';

const SearchView = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (text) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        style={{backgroundColor: COLORS.light, borderRadius: 30}}
        placeholder="Search Here..."
        onChangeText={updateSearch}
        value={search}
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
