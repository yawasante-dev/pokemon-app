import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [metricUnits, setMetricUnits] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="volume-high-outline" size={22} color="#1E6091" />
              <Text style={styles.rowLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: '#CBD5E1', true: '#1E6091' }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="scale-outline" size={22} color="#1E6091" />
              <Text style={styles.rowLabel}>Metric Units (m / kg)</Text>
            </View>
            <Switch
              value={metricUnits}
              onValueChange={setMetricUnits}
              trackColor={{ false: '#CBD5E1', true: '#1E6091' }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={22} color="#1E6091" />
              <Text style={styles.rowLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#CBD5E1', true: '#1E6091' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Cache</Text>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => Alert.alert('Cache Cleared', 'PokéAPI cache cleared successfully.')}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="trash-outline" size={22} color="#E11D48" />
              <Text style={[styles.rowLabel, { color: '#E11D48' }]}>Clear PokéAPI Cache</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#131F2A',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
});
