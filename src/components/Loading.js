import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import COLORS from '../constants/colors';

export default function Loading({ message = 'Loading Pokémon...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.red} />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.gray,
  },
});