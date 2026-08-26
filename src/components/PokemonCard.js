import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
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

  const cardColor =
    COLORS.type[primaryType] || COLORS.type.normal;

  return (
    <Pressable
      style={[
        styles.card,
        {
          borderLeftColor: cardColor,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.number}>
            {number}
          </Text>

          <Text style={styles.name}>
            {capitalize(name)}
          </Text>
        </View>

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? COLORS.red : COLORS.gray}
          />
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.typeContainer}>
          {types.map((item) => (
            <View
              key={item.type.name}
              style={[
                styles.typeBadge,
                {
                  backgroundColor:
                    COLORS.type[item.type.name] ||
                    COLORS.type.normal,
                },
              ]}
            >
              <Text style={styles.typeText}>
                {capitalize(item.type.name)}
              </Text>
            </View>
          ))}
        </View>

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
    backgroundColor: COLORS.white,
    borderRadius: 18,
    marginBottom: 14,
    padding: 16,
    borderLeftWidth: 6,

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  number: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },

  name: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
  },

  favoriteButton: {
    padding: 5,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 5,
  },

  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
    paddingBottom: 10,
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

  image: {
    width: 110,
    height: 110,
  },
});