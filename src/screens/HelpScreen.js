import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/colors';

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="help-circle"
          size={60}
          color={COLORS.red}
        />

        <Text style={styles.title}>
          Help
        </Text>

        <Text style={styles.text}>
          Use the search bar on the Home screen to find
          Pokémon by name.
        </Text>

        <Text style={styles.text}>
          Tap a Pokémon card to view its full details,
          including type, height, weight and base stats.
        </Text>

        <Text style={styles.text}>
          Tap the heart icon to mark a Pokémon as a
          favourite.
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