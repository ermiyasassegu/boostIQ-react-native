import React, {useCallback, useContext, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Input, Button} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';

const EditProfile = ({navigation}) => {
  const {checkUsername, putUser} = useUser();
  const {user, setUser} = useContext(MainContext);
  const [image, setImage] = useState(
    'https://img.icons8.com/metro/26/000000/user-male-circle.png'
  );
  const [imageSelected, setImageSelected] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
      full_name: user.full_name,
    },
    mode: 'onBlur',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    if (true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
        setImageSelected(true);
      }
    }
  };

  const reset = () => {
    setImage('https://img.icons8.com/metro/26/000000/user-male-circle.png');
    setImageSelected(false);
    setValue('username', '');
    setValue('password', '');
    setValue('confirmPassword', '');
    setValue('email', '');
    setValue('full_name', '');
    setType('image');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      if (data.password === '') {
        delete data.password;
      }
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await putUser(data, userToken);
      if (userData) {
        Alert.alert('Success', userData.message);
        delete data.password;
        setUser(data);
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}
    >
      <View>
        <Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        ></Image>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            minLength: {
              value: 3,
              message: 'Username has to be at least 3 characters.',
            },
            validate: async (value) => {
              try {
                const available = await checkUsername(value);
                if (available || user.username === value) {
                  return true;
                } else {
                  return 'Username is already taken.';
                }
              } catch (error) {
                throw new Error(error.message);
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
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

        <Controller
          control={control}
          rules={{
            minLength: {
              value: 5,
              message: 'Password has to be at least 5 characters.',
            },
            /*
          pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
            message: 'Min 8, Uppercase, Number',
          },
          */
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
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

        <Controller
          control={control}
          rules={{
            validate: (value) => {
              const {password} = getValues();
              if (value === password) {
                return true;
              } else {
                return 'Passwords do not match.';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirm Password"
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required.'},
            pattern: {
              value: /\S+@\S+\.\S+$/,
              message: 'Has to be valid email.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Email"
              errorMessage={errors.email && errors.email.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            minLength: {
              value: 3,
              message: 'Full name has to be at least 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              placeholder="Full name"
              errorMessage={errors.full_name && errors.full_name.message}
            />
          )}
          name="full_name"
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({
  image: {
    width: '20%',
    height: undefined,
    aspectRatio: 1.2,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  container: {
    flex: 1,
  },
});

export default EditProfile;
