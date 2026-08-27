import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypeBadge from './TypeBadge';
import { TYPE_CONFIG, formatPokemonNumber, capitalize, getPokemonImage } from '../constants/pokemonAssets';

export default function PokemonCard({
  name,
  image,
  number,
  types = [],
  isFavorite: isFavoriteProp,
  onToggleFavorite,
  onPress,
}) {
  const [localFavorite, setLocalFavorite] = useState(false);
  const isFavorite = isFavoriteProp !== undefined ? isFavoriteProp : localFavorite;

  const handleFavoritePress = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (onToggleFavorite) {
      onToggleFavorite(number);
    } else {
      setLocalFavorite(!localFavorite);
    }
  };

  const primaryType = types[0] || 'normal';
  const typeConfig = TYPE_CONFIG[primaryType.toLowerCase()] || TYPE_CONFIG.normal;
  const imageSource = typeof image === 'string' ? { uri: image } : (image || getPokemonImage(number, name));

  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardInner}>
        <View style={styles.leftContent}>
          <Text style={styles.pokemonNumber}>
            {typeof number === 'number' ? formatPokemonNumber(number) : number}
          </Text>
          <Text style={styles.pokemonName} numberOfLines={1}>
            {capitalize(name)}
          </Text>
          <View style={styles.typesRow}>
            {types.map((type, index) => (
              <TypeBadge key={index} typeName={type} size="medium" />
            ))}
          </View>
        </View>

        <View style={[styles.imageWrapper, { backgroundColor: typeConfig.containerColor }]}>
          <View style={styles.backgroundShape}>
            <View style={styles.backgroundInnerShape} />
          </View>

          <Image source={imageSource} style={styles.pokemonImage} resizeMode="contain" />

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={handleFavoritePress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? '#FF3B30' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 20,
    backgroundColor: '#E6F0F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
    minHeight: 110,
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  pokemonNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B6B82',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#131F2A',
    marginBottom: 8,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 118,
    height: 100,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundInnerShape: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  pokemonImage: {
    width: 85,
    height: 85,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
});
