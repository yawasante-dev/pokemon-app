import React from 'react';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';

import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import SupportScreen from '../screens/SupportScreen';

import COLORS from '../constants/colors';

const Drawer =
  createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        // Home has its own custom header (menu button, search bar, etc.),
        // so only hide the native header there. Settings/Help/Support
        // need the native header so they get a working back button.
        headerShown: route.name !== 'Pokédex',
        headerTitleAlign: 'center',

        drawerActiveTintColor: COLORS.red,

        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 14,
          fontWeight: '600',
        },

        drawerIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Pokédex':
              iconName = 'grid-outline';
              break;

            case 'Settings':
              iconName = 'settings-outline';
              break;

            case 'Help':
              iconName = 'help-circle-outline';
              break;

            case 'Support':
              iconName = 'headset-outline';
              break;

            case 'Logout':
              iconName = 'log-out-outline';
              break;

            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Drawer.Screen
        name="Pokédex"
        component={TabNavigator}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Drawer.Screen
        name="Help"
        component={HelpScreen}
      />

      <Drawer.Screen
        name="Support"
        component={SupportScreen}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
      />
    </Drawer.Navigator>
  );
}

function LogoutScreen({ navigation }) {
  React.useEffect(() => {
    navigation.navigate('Pokédex');
  }, []);

  return null;
}