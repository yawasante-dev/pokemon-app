import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import COLORS, { withAlpha } from '../constants/colors';
import { capitalize } from '../constants/pokemon';

export default function PokemonCard({
  name,
  image,
  number,
  types = [],
  isFavorite,
  onToggleFavorite,
  onPress,
}) {
  const primaryType = types[0]?.type?.name || 'normal';
  const cardColor = COLORS.type[primaryType] || COLORS.type.normal;

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: withAlpha(cardColor, 0.12) },
      ]}
      onPress={onPress}
    >
      {/* Left side: number, name, type badges */}
      <View style={styles.infoSection}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.name}>{capitalize(name)}</Text>

        <View style={styles.typeContainer}>
          {types.map((item) => (
            <View
              key={item.type.name}
              style={[
                styles.typeBadge,
                { backgroundColor: COLORS.type[item.type.name] || COLORS.type.normal },
              ]}
            >
              <Text style={styles.typeText}>
                {capitalize(item.type.name)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Right side: solid colour box with the artwork, matching the Figma cards */}
      <View style={[styles.imageBox, { backgroundColor: cardColor }]}>
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          style={styles.favoriteButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? COLORS.red : COLORS.white}
          />
        </Pressable>

        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },

  infoSection: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  number: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },

  name: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.black,
  },

  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  typeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },

  imageBox: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },

  image: {
    width: 88,
    height: 88,
  },
});