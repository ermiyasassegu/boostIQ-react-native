import React from 'react';
import {SafeAreaView, View} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import List from '../components/List';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchView from '../components/SearchView';
import ListbyCat from '../components/ListbyCat';
import ListCategories from '../components/ListCatagories';

const ByCategory = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <Header navigation={navigation} />
      </View>
      <ListbyCat navigation={navigation} />
    </SafeAreaView>
  );
};

ByCategory.propTypes = {
  navigation: PropTypes.object,
};

export default ByCategory;
