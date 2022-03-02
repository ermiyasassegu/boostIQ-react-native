import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import COLORS from '../utils/colors';

const Register = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('chekToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <Image
          style={styles.imageLogo}
          source={require('../assets/boostIQLogo.png')}
        />

        <RegisterForm navigation={navigation} />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 12,
  },

  imageLogo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    margin: 10,
  },
});

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
