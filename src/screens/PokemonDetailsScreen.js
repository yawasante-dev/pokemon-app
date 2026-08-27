import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TypeBadge from '../components/TypeBadge';
import {
  TYPE_CONFIG,
  formatPokemonNumber,
  capitalize,
  getPokemonImage,
} from '../constants/pokemonAssets';
import { useFavorites } from '../context/FavoritesContext';

const WEAKNESS_MAP = {
  grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
  fire: ['water', 'ground', 'rock'],
  water: ['electric', 'grass'],
  bug: ['fire', 'flying', 'rock'],
  normal: ['fighting'],
  electric: ['ground'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'grass', 'ice'],
  fairy: ['poison', 'steel'],
  fighting: ['flying', 'psychic', 'fairy'],
  psychic: ['bug', 'ghost', 'dark'],
  rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
  ghost: ['ghost', 'dark'],
  ice: ['fire', 'fighting', 'rock', 'steel'],
  dragon: ['ice', 'dragon', 'fairy'],
};

export default function PokemonDetailsScreen({ route, navigation }) {
  const { pokemonId, pokemonName, initialTypes = [], initialImage } = route.params || {};

  const [details, setDetails] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(pokemonId);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const id = pokemonId || pokemonName;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error('Could not fetch details');
        const data = await res.json();

        if (isMounted) setDetails(data);

        try {
          const sRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          if (sRes.ok) {
            const sData = await sRes.json();
            if (isMounted) setSpecies(sData);
          }
        } catch (e) {}
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [pokemonId, pokemonName]);

  const types = details
    ? details.types.map((t) => t.type.name)
    : initialTypes.length > 0
    ? initialTypes
    : ['grass', 'poison'];

  const primaryType = types[0] || 'grass';
  const typeConfig = TYPE_CONFIG[primaryType.toLowerCase()] || TYPE_CONFIG.grass;
  const imageSource = initialImage || getPokemonImage(pokemonId, pokemonName);

  const weightKg = details ? (details.weight / 10).toFixed(1) : loading ? '...' : 'N/A';
  const heightMeters = details ? (details.height / 10).toFixed(1) : loading ? '...' : 'N/A';

  const category = species?.genera?.find((g) => g.language.name === 'en')?.genus.replace(' Pokémon', '') || (loading ? '...' : 'Seed');
  const flavorText = species?.flavor_text_entries
    ?.find((f) => f.language.name === 'en')
    ?.flavor_text.replace(/[\n\f]/g, ' ') ||
    (loading ? 'Loading Pokémon details...' : 'There is a plant seed on its back from the day this Pokémon is born.');

  const mainAbility = details?.abilities?.[0]?.ability?.name
    ? capitalize(details.abilities[0].ability.name)
    : (loading ? '...' : 'Overgrow');

  const weaknesses = WEAKNESS_MAP[primaryType.toLowerCase()] || ['fire', 'psychic', 'flying', 'ice'];

  const evolutions = [
    { id: 1, name: 'bulbasaur', types: ['grass', 'poison'], level: 'Level 16' },
    { id: 2, name: 'ivysaur', types: ['grass', 'poison'], level: 'Level 36' },
    { id: 3, name: 'venusaur', types: ['grass', 'poison'], level: null },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Card */}
        <View style={[styles.headerContainer, { backgroundColor: typeConfig.containerColor }]}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavorite(pokemonId)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.leafBackdrop}>
            <Image source={imageSource} style={styles.pokemonImage} resizeMode="contain" />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.bodySection}>
          <Text style={styles.nameText}>{capitalize(pokemonName || details?.name || 'Bulbasaur')}</Text>
          <Text style={styles.numberText}>{formatPokemonNumber(pokemonId || details?.id)}</Text>

          <View style={styles.typesRow}>
            {types.map((type, idx) => (
              <TypeBadge key={idx} typeName={type} size="medium" />
            ))}
          </View>

          <Text style={styles.flavorText}>{flavorText}</Text>

          {/* 2x2 Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>WEIGHT</Text>
              <Text style={styles.metricValue}>{weightKg}{details ? ' kg' : ''}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>HEIGHT</Text>
              <Text style={styles.metricValue}>{heightMeters}{details ? ' m' : ''}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>CATEGORY</Text>
              <Text style={styles.metricValue} numberOfLines={1}>{category}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>ABILITY</Text>
              <Text style={styles.metricValue} numberOfLines={1}>{mainAbility}</Text>
            </View>
          </View>

          {/* Gender */}
          <View style={styles.genderSection}>
            <Text style={styles.sectionTitle}>GENDER</Text>
            <View style={styles.genderBarTrack}>
              <View style={[styles.genderBarBlue, { width: '87.5%' }]} />
              <View style={[styles.genderBarPink, { width: '12.5%' }]} />
            </View>
            <View style={styles.genderLabelsRow}>
              <Text style={styles.genderTxt}>♂ 87.5%</Text>
              <Text style={styles.genderTxt}>♀ 12.5%</Text>
            </View>
          </View>

          {/* Weaknesses */}
          <View style={styles.sectionContainer}>
            <Text style={styles.headingText}>Weaknesses</Text>
            <View style={styles.weaknessGrid}>
              {weaknesses.map((wType, i) => (
                <View key={i} style={styles.weaknessPill}>
                  <TypeBadge typeName={wType} size="medium" />
                </View>
              ))}
            </View>
          </View>

          {/* Evolutions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.headingText}>Evolutions</Text>
            <View style={styles.evoCardContainer}>
              {evolutions.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.evoCard}
                    onPress={() => {
                      navigation.navigate('PokemonDetails', {
                        pokemonId: item.id,
                        pokemonName: item.name,
                        initialTypes: item.types,
                      });
                    }}
                  >
                    <View style={[styles.evoImageWrapper, { backgroundColor: typeConfig.containerColor }]}>
                      <Image source={getPokemonImage(item.id, item.name)} style={styles.evoImg} resizeMode="contain" />
                    </View>
                    <View style={styles.evoInfo}>
                      <Text style={styles.evoName}>{capitalize(item.name)}</Text>
                      <Text style={styles.evoNumber}>{formatPokemonNumber(item.id)}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        {item.types.map((t, i) => (
                          <TypeBadge key={i} typeName={t} size="small" />
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>

                  {item.level && (
                    <View style={styles.arrowRow}>
                      <Ionicons name="arrow-down" size={20} color="#1E6091" />
                      <Text style={styles.levelText}>{item.level}</Text>
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    height: 260,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    paddingHorizontal: 20,
    paddingTop: 8,
    position: 'relative',
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  leafBackdrop: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pokemonImage: {
    width: 170,
    height: 170,
  },
  bodySection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  nameText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#131F2A',
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
  },
  typesRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  flavorText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  genderSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  genderBarTrack: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 6,
  },
  genderBarBlue: {
    backgroundColor: '#2563EB',
  },
  genderBarPink: {
    backgroundColor: '#EC4899',
  },
  genderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#131F2A',
    marginBottom: 12,
  },
  weaknessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  weaknessPill: {
    width: '48%',
  },
  evoCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  evoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 8,
    marginVertical: 4,
  },
  evoImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  evoImg: {
    width: 50,
    height: 50,
  },
  evoInfo: {
    flex: 1,
  },
  evoName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  evoNumber: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  arrowRow: {
    alignItems: 'center',
    marginVertical: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E6091',
    marginTop: 2,
  },
});
