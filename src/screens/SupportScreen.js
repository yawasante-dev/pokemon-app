import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/colors';

export default function SupportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="headset"
          size={60}
          color={COLORS.red}
        />

        <Text style={styles.text}>
          If you experience a problem with the
          application, please check your internet
          connection and try again.
        </Text>

        <Text style={styles.text}>
          Pokémon information is provided by PokéAPI.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 15,
    color: COLORS.black,
  },

  text: {
    marginTop: 18,
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 24,
  },
});