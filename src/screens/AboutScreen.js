import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/colors';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="sparkles"
            size={42}
            color={COLORS.red}
          />
        </View>

        <Text style={styles.title}>
          About Pokédex
        </Text>

        <Text style={styles.description}>
          A simple Pokémon browser built with React
          Native and Expo for DCIT 324 Mobile
          Application Development.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Live Pokémon Data
          </Text>

          <Text style={styles.cardText}>
            Pokémon information is retrieved from the
            PokéAPI, allowing the application to display
            real Pokémon data.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Technologies
          </Text>

          <Text style={styles.cardText}>
            React Native{'\n'}
            Expo{'\n'}
            React Navigation{'\n'}
            PokéAPI
          </Text>
        </View>
      </ScrollView>
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

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
  },

  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.black,
  },

  description: {
    textAlign: 'center',
    color: COLORS.gray,
    lineHeight: 23,
    marginTop: 12,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 8,
  },

  cardText: {
    color: COLORS.gray,
    lineHeight: 23,
  },
});