import React from 'react';
import {SafeAreaView, View} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import List from '../components/List';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchView from '../components/SearchView';
import ListCatagories from '../components/ListCatagories';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <Header navigation={navigation} />
        <SearchView navigation={navigation} />
        <ListCatagories navigation={navigation} />
      </View>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
