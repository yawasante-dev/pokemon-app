import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HelpSupportScreen({ navigation }) {
  const faqs = [
    {
      q: 'How do I add a Pokémon to favorites?',
      a: 'Tap the heart icon on the top right of any Pokémon card or details page to toggle it as a favorite.',
    },
    {
      q: 'Where does the Pokémon data come from?',
      a: 'All data is dynamically fetched from PokéAPI REST endpoints (https://pokeapi.co/).',
    },
    {
      q: 'How do I filter Pokémon by type?',
      a: 'Tap the "All Types" filter button or scroll through the horizontal type pills in the top bar.',
    },
    {
      q: 'How do I change sorting order?',
      a: 'Tap the sort button on the home screen to toggle between Lowest Number, Highest Number, and Name (A-Z).',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.sectionHeader}>Frequently Asked Questions (FAQ)</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>❓ {faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </View>
        ))}

        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={28} color="#1E6091" style={{ marginBottom: 8 }} />
          <Text style={styles.contactTitle}>Need More Help?</Text>
          <Text style={styles.contactDesc}>
            Check the official PokéAPI documentation for complete endpoint details.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL('https://pokeapi.co/docs/v2')}
          >
            <Text style={styles.contactBtnText}>PokéAPI Documentation</Text>
            <Ionicons name="open-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    padding: 16,
    paddingBottom: 40,
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
  contactCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 13,
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 18,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E6091',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
