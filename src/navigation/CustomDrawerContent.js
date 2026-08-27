import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of Pokédex?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Logged Out', 'Session ended successfully.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pokédex</Text>
        </View>

        <View style={styles.itemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerScroll: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#131F2A',
  },
  itemsContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: 16,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E11D48',
  },
});
