import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ScreenRoute} from '../Navigation/ScreenRoute';
import HomeScreen from './Home/HomeScreen';
import LikeScreen from './Like/LikeScreen';
import NewScreen from './New/NewScreen';
import React from 'react';
import ProfileScreen from './Profile/ProfileScreen';
import SearchScreen from './Search/SearchScreen';
import {Image} from 'react-native';
import {
  Home_Tab_Selected,
  Home_Tab_Un_Selected,
  New_Tab_Selected,
  New_Tab_Un_Selected,
  Like_Tab_Selected,
  Like_Tab_Un_Selected,
  Profile_Tab_Selected,
  Profile_Tab_Un_Selected,
  SEARCH,
} from '../assets';
import {colors} from '../style-guide';
import {Text} from '../component-library';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const HOME_TAB = 'Home';
  const SEARCH_TAB = 'Search';
  const NEW_TAB = 'New';
  const LIKES_TAB = 'Likes';
  const PROFILE_TAB = 'Profile';

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ScreenRoute.HOME_SCREEN}>
      <Tab.Screen
        name={ScreenRoute.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({color, focused, position}) => {
            return (
              <Text
                style={{
                  padding: '0%',
                  color: focused ? colors.pink.default : colors.greys.black,
                }}>
                {HOME_TAB}
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => (
            <Image
              style={{
                width: '30%',
                height: '70%',
                tintColor: focused ? colors.pink.default : colors.greys.black,
              }}
              source={focused ? Home_Tab_Selected : Home_Tab_Un_Selected}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ScreenRoute.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({color, focused, position}) => {
            return (
              <Text
                style={{
                  padding: '0%',
                  color: focused ? colors.pink.default : colors.greys.black,
                }}>
                {SEARCH_TAB}
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => (
            <Image
              style={{
                width: '30%',
                height: '70%',
                tintColor: focused ? colors.pink.default : colors.greys.black,
              }}
              source={SEARCH}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ScreenRoute.NEW_SCREEN}
        component={NewScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({color, focused, position}) => {
            return (
              <Text
                style={{
                  padding: '0%',
                  color: focused ? colors.pink.default : colors.greys.black,
                }}>
                {NEW_TAB}
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => (
            <Image
              style={{
                width: '30%',
                height: '70%',
                tintColor: focused ? colors.pink.default : colors.greys.black,
              }}
              source={focused ? New_Tab_Selected : New_Tab_Un_Selected}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ScreenRoute.LIKE_SCREEN}
        component={LikeScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({color, focused, position}) => {
            return (
              <Text
                style={{
                  padding: '0%',
                  color: focused ? colors.pink.default : colors.greys.black,
                }}>
                {LIKES_TAB}
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => (
            <Image
              style={{
                width: '30%',
                height: '70%',
                tintColor: focused ? colors.pink.default : colors.greys.black,
              }}
              source={focused ? Like_Tab_Selected : Like_Tab_Un_Selected}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ScreenRoute.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: true,
          tabBarLabel: ({color, focused, position}) => {
            return (
              <Text
                style={{
                  padding: '0%',
                  color: focused ? colors.pink.default : colors.greys.black,
                }}>
                {PROFILE_TAB}
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => (
            <Image
              style={{
                width: '30%',
                height: '70%',
                tintColor: focused ? colors.pink.default : colors.greys.black,
              }}
              source={focused ? Profile_Tab_Selected : Profile_Tab_Un_Selected}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
