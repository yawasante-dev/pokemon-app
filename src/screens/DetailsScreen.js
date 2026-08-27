import React, { useEffect, useState } from 'react';

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Loading from '../components/Loading';

import COLORS from '../constants/colors';
import {
  capitalize,
  formatPokemonNumber,
  getPokemonImage,
} from '../constants/pokemon';

export default function DetailsScreen({ route, navigation }) {
  const { pokemonId, pokemonName } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetails();
  }, [pokemonId]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      if (!response.ok) {
        throw new Error('Unable to load Pokémon');
      }

      const data = await response.json();

      setPokemon(data);
    } catch (err) {
      console.log(err);
      setError('Unable to load Pokémon details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading details..." />;
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Pokemon not found.'}
        </Text>
      </SafeAreaView>
    );
  }

  const primaryType =
    pokemon.types[0]?.type?.name || 'normal';

  const accentColor =
    COLORS.type[primaryType] || COLORS.type.normal;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color={COLORS.black}
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Details
          </Text>

          <View style={{ width: 26 }} />
        </View>

        <View
          style={[
            styles.hero,
            {
              backgroundColor: accentColor,
            },
          ]}
        >
          <Text style={styles.number}>
            {formatPokemonNumber(pokemon.id)}
          </Text>

          <Text style={styles.name}>
            {capitalize(pokemon.name)}
          </Text>

          <Image
            source={{
              uri: getPokemonImage(pokemon.id),
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Type
          </Text>

          <View style={styles.typeRow}>
            {pokemon.types.map((item) => {
              const type = item.type.name;

              return (
                <View
                  key={type}
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        COLORS.type[type] ||
                        COLORS.type.normal,
                    },
                  ]}
                >
                  <Text style={styles.typeText}>
                    {capitalize(type)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Ionicons
              name="resize-outline"
              size={28}
              color={accentColor}
            />

            <Text style={styles.statLabel}>
              Height
            </Text>

            <Text style={styles.statValue}>
              {(pokemon.height / 10).toFixed(1)} m
            </Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons
              name="fitness-outline"
              size={28}
              color={accentColor}
            />

            <Text style={styles.statLabel}>
              Weight
            </Text>

            <Text style={styles.statValue}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Base Stats
          </Text>

          {pokemon.stats.map((item) => (
            <View
              key={item.stat.name}
              style={styles.statRow}
            >
              <Text style={styles.statName}>
                {capitalize(
                  item.stat.name.replace('-', ' ')
                )}
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progress,
                    {
                      width: `${Math.min(
                        item.base_stat / 2,
                        100
                      )}%`,
                      backgroundColor: accentColor,
                    },
                  ]}
                />
              </View>

              <Text style={styles.baseStat}>
                {item.base_stat}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
  },

  hero: {
    marginHorizontal: 20,
    borderRadius: 25,
    minHeight: 300,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  number: {
    color: COLORS.white,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: '700',
  },

  name: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },

  image: {
    width: 210,
    height: 210,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 12,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },

  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  typeText: {
    color: COLORS.white,
    fontWeight: '800',
  },

  stats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    elevation: 2,
  },

  statLabel: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 8,
  },

  statValue: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 3,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  statName: {
    width: 100,
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '600',
  },

  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    borderRadius: 10,
  },

  baseStat: {
    width: 35,
    textAlign: 'right',
    fontWeight: '800',
    color: COLORS.black,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  errorText: {
    color: COLORS.red,
    fontSize: 16,
  },
});