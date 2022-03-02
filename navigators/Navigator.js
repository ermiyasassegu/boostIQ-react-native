import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Login from '../views/Login';
import Register from '../views/Register';
import OnBoardScreen from '../views/OnBoardScreen';
import SearchView from '../components/SearchView';
import {MainContext} from '../contexts/MainContext';
import {Icon} from 'react-native-elements';
import Post from '../views/Post';
import MyFiles from '../views/Myfiles';
import EditProfile from '../views/EditProfile';
import Modify from '../views/Modify';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'searchView':
              iconName = 'search';
              break;
            case 'Profile':
              iconName = 'account-box';
              break;
            case 'Post':
              iconName = 'cloud-upload';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      ></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      <Tab.Screen name="Post" component={Post}></Tab.Screen>
      <Tab.Screen name="searchView" component={SearchView}></Tab.Screen>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabScreen}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen name="Single" component={Single}></Stack.Screen>
          <Stack.Screen
            name="Edit Profile"
            component={EditProfile}
          ></Stack.Screen>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="My Files" component={MyFiles}></Stack.Screen>
          <Stack.Screen name="Modify" component={Modify}></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name="OnBoardScreen"
            component={OnBoardScreen}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
