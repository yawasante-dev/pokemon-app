import React, { useEffect, useMemo, useState } from 'react';

import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';

import COLORS from '../constants/colors';
import {
  capitalize,
  formatPokemonNumber,
  getPokemonImage,
} from '../constants/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

const SORT_OPTIONS = [
  { key: 'asc', label: 'Lowest Number' },
  { key: 'desc', label: 'Highest Number' },
  { key: 'name-asc', label: 'A-Z' },
  { key: 'name-desc', label: 'Z-A' },
];

export default function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('asc');
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}?limit=30&offset=0`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
      }

      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (item) => {
          const detailResponse = await fetch(item.url);

          if (!detailResponse.ok) {
            throw new Error('Failed to fetch Pokémon details');
          }

          return detailResponse.json();
        })
      );

      setPokemon(detailedPokemon);
    } catch (err) {
      console.log(err);
      setError(
        'Unable to load Pokémon. Please check your internet connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  // All type names present in the currently loaded Pokémon, used to
  // populate the "Type" filter dropdown.
  const availableTypes = useMemo(() => {
    const set = new Set();
    pokemon.forEach((item) => {
      item.types.forEach((t) => set.add(t.type.name));
    });
    return Array.from(set).sort();
  }, [pokemon]);

  const filteredPokemon = useMemo(() => {
    let list = pokemon.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedType !== 'all') {
      list = list.filter((item) =>
        item.types.some((t) => t.type.name === selectedType)
      );
    }

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'asc':
        default:
          return a.id - b.id;
      }
    });

    return list;
  }, [pokemon, search, selectedType, sortBy]);

  const sortLabel =
    SORT_OPTIONS.find((option) => option.key === sortBy)?.label ||
    'Sort';

  const renderPokemon = ({ item }) => {
    return (
      <PokemonCard
        name={item.name}
        image={getPokemonImage(item.id)}
        number={formatPokemonNumber(item.id)}
        types={item.types}
        isFavorite={!!favorites[item.id]}
        onToggleFavorite={() =>
          toggleFavorite(item.id)
        }
        onPress={() =>
          navigation.navigate('PokemonDetails', {
            pokemonId: item.id,
            pokemonName: item.name,
          })
        }
      />
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons
          name="cloud-offline-outline"
          size={60}
          color={COLORS.red}
        />

        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={fetchPokemon}
        >
          <Text style={styles.retryText}>
            Try Again
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            WELCOME TO
          </Text>

          <Text style={styles.title}>
            Pokédex
          </Text>
        </View>

        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons
            name="menu"
            size={28}
            color={COLORS.black}
          />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={COLORS.gray}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Pokémon..."
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
        />
      </View>

      {/* Type filter + sort dropdown pills, matching the Figma header */}
      <View style={styles.filterRow}>
        <Pressable
          style={styles.filterPill}
          onPress={() => setTypeModalVisible(true)}
        >
          <Text style={styles.filterPillText} numberOfLines={1}>
            {selectedType === 'all' ? 'All Types' : capitalize(selectedType)}
          </Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.white} />
        </Pressable>

        <Pressable
          style={styles.filterPill}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={styles.filterPillText} numberOfLines={1}>
            {sortLabel}
          </Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.white} />
        </Pressable>
      </View>

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchPokemon}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>
              Pokémon
            </Text>

            <Text style={styles.count}>
              {filteredPokemon.length} found
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Pokémon found.
            </Text>
          </View>
        }
      />

      {/* Type filter dropdown */}
      <Modal
        visible={typeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTypeModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Filter by Type</Text>

            <FlatList
              data={['all', ...availableTypes]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedType(item);
                    setTypeModalVisible(false);
                  }}
                >
                  {item !== 'all' && (
                    <View
                      style={[
                        styles.modalDot,
                        { backgroundColor: COLORS.type[item] || COLORS.type.normal },
                      ]}
                    />
                  )}
                  <Text style={styles.modalOptionText}>
                    {item === 'all' ? 'All Types' : capitalize(item)}
                  </Text>
                  {selectedType === item && (
                    <Ionicons name="checkmark" size={18} color={COLORS.red} />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Sort dropdown */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Sort By</Text>

            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                style={styles.modalOption}
                onPress={() => {
                  setSortBy(option.key);
                  setSortModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>
                  {option.label}
                </Text>
                {sortBy === option.key && (
                  <Ionicons name="checkmark" size={18} color={COLORS.red} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray,
    letterSpacing: 1.5,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 2,
  },

  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  searchContainer: {
    height: 50,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.black,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.dark,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
  },

  filterPillText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
  },

  list: {
    padding: 20,
    paddingTop: 8,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.black,
  },

  count: {
    fontSize: 13,
    color: COLORS.gray,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },

  emptyText: {
    color: COLORS.gray,
    fontSize: 15,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  errorTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.black,
  },

  errorText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 10,
    lineHeight: 22,
  },

  retryButton: {
    marginTop: 22,
    backgroundColor: COLORS.red,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 25,
  },

  retryText: {
    color: COLORS.white,
    fontWeight: '800',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },

  modalSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '70%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 12,
  },

  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    gap: 10,
  },

  modalDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  modalOptionText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '600',
  },
});