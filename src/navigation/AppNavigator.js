import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import CustomDrawerContent from './CustomDrawerContent';

const pokeballIcon = require('../../assets/pokeball-icon.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#185A9D',
        tabBarInactiveTintColor: '#8C9DAE',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="PokedexTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={pokeballIcon}
              style={[styles.tabIcon, !focused && styles.inactiveTabIcon]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'information-circle' : 'information-circle-outline'}
              size={24}
              color={focused ? '#185A9D' : '#8C9DAE'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerActiveTintColor: '#1E6091',
        drawerInactiveTintColor: '#475569',
        drawerLabelStyle: {
          fontWeight: '700',
          fontSize: 14,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingVertical: 2,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="PokedexMain"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Pokédex',
        }}
      />
      <Drawer.Screen
        name="AboutDrawer"
        component={AboutScreen}
        options={{
          drawerLabel: 'About App',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
      <Drawer.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          drawerLabel: 'Help & Support',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26,
  },
  inactiveTabIcon: {
    tintColor: '#8C9DAE',
    opacity: 0.8,
  },
  drawerIcon: {
    width: 22,
    height: 22,
  },
});
