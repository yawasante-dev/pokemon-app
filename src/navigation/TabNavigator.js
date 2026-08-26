import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import AboutScreen from '../screens/AboutScreen';

import COLORS from '../constants/colors';

const Tab =
  createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.red,
        tabBarInactiveTintColor: COLORS.gray,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
      />
    </Tab.Navigator>
  );
}