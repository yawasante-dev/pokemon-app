import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import PokemonFilterHeader from '../components/PokemonFilterHeader';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonImage } from '../constants/pokemonAssets';
import { KANTO_TYPES } from '../constants/kantoTypes';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('asc');

  const { isFavorite, toggleFavorite } = useFavorites();

  const fetchPokemonList = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      if (!response.ok) {
        throw new Error(`Failed to load Pokemon: status ${response.status}`);
      }
      const data = await response.json();

      const formatted = data.results.map((item, index) => {
        const id = index + 1;
        const types = KANTO_TYPES[id] || ['normal'];
        const image = getPokemonImage(id, item.name);
        return { id, name: item.name, url: item.url, types, image };
      });

      setPokemonList(formatted);
    } catch (err) {
      setError(err.message || 'Could not fetch Pokemon list.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPokemonList();
  };

  const handleToggleSort = () => {
    setSortBy((current) => {
      if (current === 'asc') return 'desc';
      if (current === 'desc') return 'name';
      return 'asc';
    });
  };

  const filteredPokemon = useMemo(() => {
    let list = [...pokemonList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.id).includes(q) ||
          `N°${String(p.id).padStart(3, '0')}`.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'all') {
      list = list.filter((p) => p.types.includes(selectedType.toLowerCase()));
    }

    if (sortBy === 'asc') {
      list.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'desc') {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [pokemonList, searchQuery, selectedType, sortBy]);

  const renderPokemonCard = ({ item }) => (
    <PokemonCard
      number={item.id}
      name={item.name}
      image={item.image}
      types={item.types}
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
      onPress={() => {
        navigation.navigate('PokemonDetails', {
          pokemonId: item.id,
          pokemonName: item.name,
          initialTypes: item.types,
          initialImage: item.image,
        });
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <PokemonFilterHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        sortBy={sortBy}
        onToggleSort={handleToggleSort}
        onOpenDrawer={() => {
          if (navigation.openDrawer) {
            navigation.openDrawer();
          } else {
            navigation.getParent()?.openDrawer?.();
          }
        }}
      />

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E6091" />
          <Text style={styles.loadingText}>Loading Pokédex...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPokemonList}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPokemonCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E6091']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Pokémon found</Text>
              <Text style={styles.emptySubtitle}>Try searching for another name or filter</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#E11D48',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#1E6091',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});
