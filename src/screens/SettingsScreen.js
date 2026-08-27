import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import COLORS from '../constants/colors';

export default function SettingsScreen() {
  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View>
            <Text style={styles.label}>
              Notifications
            </Text>

            <Text style={styles.description}>
              Receive app notifications
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.label}>
              Dark Mode
            </Text>

            <Text style={styles.description}>
              Use a darker appearance
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
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
    padding: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
  },

  description: {
    marginTop: 4,
    color: COLORS.gray,
  },
});