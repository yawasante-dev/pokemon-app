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
import { capitalize, TYPE_ICONS } from '../constants/pokemon';

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
          {types.map((item) => {
            const typeName = item.type.name;
            return (
              <View
                key={typeName}
                style={[
                  styles.typeBadge,
                  { backgroundColor: COLORS.type[typeName] || COLORS.type.normal },
                ]}
              >
                <Ionicons
                  name={TYPE_ICONS[typeName] || 'ellipse'}
                  size={11}
                  color={COLORS.white}
                  style={styles.typeIcon}
                />
                <Text style={styles.typeText}>
                  {capitalize(typeName)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Right side: solid colour box with the artwork, matching the Figma cards */}
      <View style={[styles.imageBox, { backgroundColor: cardColor }]}>
        {/* Soft glowing circles behind the artwork for a bit of depth,
            instead of a completely flat colour block */}
        <View style={styles.glowOuter} />
        <View style={styles.glowInner} />

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  typeIcon: {
    marginRight: 4,
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
    overflow: 'hidden',
  },

  glowOuter: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },

  glowInner: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
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
    zIndex: 1,
  },
});