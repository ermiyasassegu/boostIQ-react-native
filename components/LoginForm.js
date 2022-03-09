import React, {useContext} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input, Text, Icon} from 'react-native-elements';
import COLORS from '../utils/colors';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Your username and password does not much');
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username has to be at least 3 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              size: 20,
              color: COLORS.darkOrange,
            }}
            style={{paddingLeft: 8}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      {/* {errors.username && <Text>This is required.</Text>} */}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              size: 20,
              color: COLORS.darkOrange,
            }}
            style={{paddingLeft: 8}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      {/*  {errors.password && <Text>This is required.</Text>} */}

      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'center',
        }}
      >
        <Text style={{fontSize: 16}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push('Register')}>
          <Text style={{color: '#6880F5', fontSize: 16}}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
