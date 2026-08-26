import React, { useEffect, useState } from 'react';

import {
  FlatList,
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

export default function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const filteredPokemon = pokemon.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
    marginBottom: 8,
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
});