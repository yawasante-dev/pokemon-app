import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TYPE_CONFIG, capitalize } from '../constants/pokemonAssets';

export default function TypeBadge({ typeName, size = 'medium' }) {
  const normalizedType = (typeName || '').toLowerCase().trim();
  const config = TYPE_CONFIG[normalizedType] || {
    name: capitalize(normalizedType),
    color: '#94A1A7',
    badgeColor: '#94A1A7',
    icon: 'help-circle-outline',
    iconFamily: 'Ionicons',
  };

  const renderIcon = () => {
    const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;
    const iconColor = '#FFFFFF';

    if (config.iconFamily === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={config.icon} size={iconSize} color={iconColor} />;
    } else if (config.iconFamily === 'MaterialIcons') {
      return <MaterialIcons name={config.icon} size={iconSize} color={iconColor} />;
    }
    return <Ionicons name={config.icon} size={iconSize} color={iconColor} />;
  };

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <View style={[
      styles.badge,
      { backgroundColor: config.badgeColor },
      isSmall && styles.badgeSmall,
      isLarge && styles.badgeLarge,
    ]}>
      <View style={[
        styles.iconContainer,
        isSmall && styles.iconContainerSmall,
        isLarge && styles.iconContainerLarge,
      ]}>
        {renderIcon()}
      </View>
      <Text style={[
        styles.badgeText,
        isSmall && styles.badgeTextSmall,
        isLarge && styles.badgeTextLarge,
      ]}>
        {config.name || capitalize(typeName)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 4,
  },
  badgeSmall: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 14,
    marginRight: 4,
    marginBottom: 2,
  },
  badgeLarge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    marginRight: 8,
    marginBottom: 6,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  iconContainerSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  iconContainerLarge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  badgeTextSmall: {
    fontSize: 10,
  },
  badgeTextLarge: {
    fontSize: 14,
    fontWeight: '700',
  },
});
