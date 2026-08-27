import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TYPE_CONFIG } from '../constants/pokemonAssets';

export default function PokemonFilterHeader({
  searchQuery,
  onSearchChange,
  selectedType,
  onSelectType,
  sortBy,
  onToggleSort,
  onOpenDrawer,
}) {
  const typeKeys = ['all', ...Object.keys(TYPE_CONFIG)];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Pokédex</Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onOpenDrawer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="menu-outline" size={26} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarWrapper}>
        <Ionicons name="search-outline" size={20} color="#8A9AA8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon..."
          placeholderTextColor="#8A9AA8"
          value={searchQuery}
          onChangeText={onSearchChange}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color="#8A9AA8" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterButton, selectedType !== 'all' && styles.filterButtonActive]}
          onPress={() => {
            const currentIndex = typeKeys.indexOf(selectedType);
            const nextIndex = (currentIndex + 1) % typeKeys.length;
            onSelectType(typeKeys[nextIndex]);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.filterButtonText}>
            {selectedType === 'all' ? 'All Types' : TYPE_CONFIG[selectedType]?.name || selectedType}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#FFFFFF" style={styles.filterChevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={onToggleSort}
          activeOpacity={0.8}
        >
          <Text style={styles.filterButtonText}>
            {sortBy === 'asc' ? 'Lowest Number' : sortBy === 'desc' ? 'Highest Number' : 'Name (A-Z)'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#FFFFFF" style={styles.filterChevron} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeScrollContainer}
      >
        <TouchableOpacity
          style={[styles.typePill, selectedType === 'all' && styles.typePillActive]}
          onPress={() => onSelectType('all')}
        >
          <Text style={[styles.typePillText, selectedType === 'all' && styles.typePillTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {Object.entries(TYPE_CONFIG).map(([typeKey, cfg]) => {
          const isSelected = selectedType === typeKey;
          return (
            <TouchableOpacity
              key={typeKey}
              style={[
                styles.typePill,
                isSelected && { backgroundColor: cfg.badgeColor, borderColor: cfg.badgeColor },
              ]}
              onPress={() => onSelectType(isSelected ? 'all' : typeKey)}
            >
              <Text style={[styles.typePillText, isSelected && styles.typePillTextActive]}>
                {cfg.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    padding: 4,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#131F2A',
    letterSpacing: -0.5,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6F9',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3C4D',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#1E6091',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  filterChevron: {
    marginLeft: 2,
  },
  typeScrollContainer: {
    paddingVertical: 2,
    gap: 6,
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 6,
  },
  typePillActive: {
    backgroundColor: '#131F2A',
    borderColor: '#131F2A',
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  typePillTextActive: {
    color: '#FFFFFF',
  },
});
