import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="information-circle" size={40} color="#1E6091" />
          </View>
          <Text style={styles.title}>Pokédex App</Text>
          <Text style={styles.sub}>University of Ghana • DCIT 324</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>About</Text>
          <Text style={styles.boxText}>
            Built with React Native & Expo for DCIT 324 Assignment 4. Features live PokéAPI integration, Stack & Tab & Drawer navigation, state management, and clean UI components.
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Stack</Text>
          <Text style={styles.boxText}>• React Native 0.81 & React 19</Text>
          <Text style={styles.boxText}>• Expo SDK 54</Text>
          <Text style={styles.boxText}>• React Navigation (Stack, Tab, Drawer)</Text>
          <Text style={styles.boxText}>• PokéAPI REST Endpoints</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL('https://pokeapi.co/')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnTxt}>Open PokéAPI Docs</Text>
          <Ionicons name="open-outline" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#131F2A',
  },
  sub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 6,
  },
  boxText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E6091',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
