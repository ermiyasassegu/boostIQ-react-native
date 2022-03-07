import React from 'react';
import {SafeAreaView, View} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import List from '../components/List';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ListCategories from '../components/ListCatagories';
import SearchView from '../components/SearchView';

const Home = ({navigation, route}) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <Header navigation={navigation} />
      </View>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
