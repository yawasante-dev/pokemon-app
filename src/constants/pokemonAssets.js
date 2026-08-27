// Mapping of Pokemon ID to local asset images provided in the assets directory
export const LOCAL_POKEMON_IMAGES = {
  1: require('../../assets/image-1.png'),   // Bulbasaur
  2: require('../../assets/image-2.png'),   // Ivysaur
  3: require('../../assets/image-3.png'),   // Venusaur
  4: require('../../assets/image-4.png'),   // Charmander
  5: require('../../assets/image-5.png'),   // Charmeleon
  6: require('../../assets/image-6.png'),   // Charizard
  7: require('../../assets/image-7.png'),   // Squirtle
  8: require('../../assets/image-8.png'),   // Wartortle
  9: require('../../assets/image-9.png'),   // Blastoise
  15: require('../../assets/image-10.png'), // Beedrill
  25: require('../../assets/image-11.png'), // Pikachu
  35: require('../../assets/image-12.png'), // Clefairy
  51: require('../../assets/image-13.png'), // Dugtrio
  95: require('../../assets/image-14.png'), // Onix
  108: require('../../assets/image-15.png'), // Lickitung
  109: require('../../assets/image-16.png'), // Koffing
  151: require('../../assets/image-17.png'), // Mew
};

// Also map by name for flexibility
export const LOCAL_POKEMON_BY_NAME = {
  bulbasaur: LOCAL_POKEMON_IMAGES[1],
  ivysaur: LOCAL_POKEMON_IMAGES[2],
  venusaur: LOCAL_POKEMON_IMAGES[3],
  charmander: LOCAL_POKEMON_IMAGES[4],
  charmeleon: LOCAL_POKEMON_IMAGES[5],
  charizard: LOCAL_POKEMON_IMAGES[6],
  squirtle: LOCAL_POKEMON_IMAGES[7],
  wartortle: LOCAL_POKEMON_IMAGES[8],
  blastoise: LOCAL_POKEMON_IMAGES[9],
  beedrill: LOCAL_POKEMON_IMAGES[15],
  pikachu: LOCAL_POKEMON_IMAGES[25],
  clefairy: LOCAL_POKEMON_IMAGES[35],
  dugtrio: LOCAL_POKEMON_IMAGES[51],
  onix: LOCAL_POKEMON_IMAGES[95],
  lickitung: LOCAL_POKEMON_IMAGES[108],
  koffing: LOCAL_POKEMON_IMAGES[109],
  mew: LOCAL_POKEMON_IMAGES[151],
};

export const TYPE_CONFIG = {
  grass: {
    name: 'Grass',
    color: '#62B957',
    badgeColor: '#62B957',
    containerColor: '#62B957',
    bgTint: '#EEF8ED',
    icon: 'leaf',
    iconFamily: 'Ionicons',
    shape: 'leaf',
  },
  poison: {
    name: 'Poison',
    color: '#A552CC',
    badgeColor: '#A552CC',
    containerColor: '#9F55C9',
    bgTint: '#F7EEFC',
    icon: 'skull',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'skull',
  },
  fire: {
    name: 'Fire',
    color: '#FFA050',
    badgeColor: '#FFA050',
    containerColor: '#E89D66',
    bgTint: '#FFF4E9',
    icon: 'fire',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'flame',
  },
  flying: {
    name: 'Flying',
    color: '#89B5F4',
    badgeColor: '#89B5F4',
    containerColor: '#82AFE9',
    bgTint: '#EDF5FE',
    icon: 'weather-windy',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'wing',
  },
  water: {
    name: 'Water',
    color: '#4F91F7',
    badgeColor: '#4F91F7',
    containerColor: '#4A90E2',
    bgTint: '#ECF4FE',
    icon: 'water',
    iconFamily: 'Ionicons',
    shape: 'drop',
  },
  bug: {
    name: 'Bug',
    color: '#8CB230',
    badgeColor: '#8CB230',
    containerColor: '#8FB830',
    bgTint: '#F2F7E7',
    icon: 'bug',
    iconFamily: 'Ionicons',
    shape: 'bug',
  },
  electric: {
    name: 'Electric',
    color: '#E6BD1C',
    badgeColor: '#E6BD1C',
    containerColor: '#E0B928',
    bgTint: '#FEF9E6',
    icon: 'flash',
    iconFamily: 'Ionicons',
    shape: 'bolt',
  },
  fairy: {
    name: 'Fairy',
    color: '#E482DC',
    badgeColor: '#E482DC',
    containerColor: '#DB7FD3',
    bgTint: '#FCF0FB',
    icon: 'star-four-points',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'star',
  },
  ground: {
    name: 'Ground',
    color: '#CA7E52',
    badgeColor: '#CA7E52',
    containerColor: '#B9744C',
    bgTint: '#FAF1EB',
    icon: 'terrain',
    iconFamily: 'MaterialIcons',
    shape: 'mountain',
  },
  rock: {
    name: 'Rock',
    color: '#A29B6A',
    badgeColor: '#A29B6A',
    containerColor: '#968E5F',
    bgTint: '#F6F4EB',
    icon: 'diamond',
    iconFamily: 'Ionicons',
    shape: 'rock',
  },
  normal: {
    name: 'Normal',
    color: '#94A1A7',
    badgeColor: '#94A1A7',
    containerColor: '#879BA3',
    bgTint: '#F1F4F6',
    icon: 'radio-button-on',
    iconFamily: 'Ionicons',
    shape: 'target',
  },
  psychic: {
    name: 'Psychic',
    color: '#F36683',
    badgeColor: '#F36683',
    containerColor: '#E35F7B',
    bgTint: '#FEEDF0',
    icon: 'circle-slice-8',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'swirl',
  },
  fighting: {
    name: 'Fighting',
    color: '#D04164',
    badgeColor: '#D04164',
    containerColor: '#D04164',
    bgTint: '#FBECEF',
    icon: 'boxing-glove',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'fist',
  },
  ghost: {
    name: 'Ghost',
    color: '#5269AD',
    badgeColor: '#5269AD',
    containerColor: '#5269AD',
    bgTint: '#EEF0F7',
    icon: 'ghost',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'ghost',
  },
  steel: {
    name: 'Steel',
    color: '#5A8EA1',
    badgeColor: '#5A8EA1',
    containerColor: '#5A8EA1',
    bgTint: '#EEF3F5',
    icon: 'shield',
    iconFamily: 'Ionicons',
    shape: 'shield',
  },
  ice: {
    name: 'Ice',
    color: '#74CEC0',
    badgeColor: '#74CEC0',
    containerColor: '#74CEC0',
    bgTint: '#F1FAF8',
    icon: 'snow',
    iconFamily: 'Ionicons',
    shape: 'snowflake',
  },
  dragon: {
    name: 'Dragon',
    color: '#0A6DC4',
    badgeColor: '#0A6DC4',
    containerColor: '#0A6DC4',
    bgTint: '#E6F0F9',
    icon: 'dragons',
    iconFamily: 'MaterialCommunityIcons',
    shape: 'dragon',
  },
  dark: {
    name: 'Dark',
    color: '#5A5366',
    badgeColor: '#5A5366',
    containerColor: '#5A5366',
    bgTint: '#EFECEF',
    icon: 'moon',
    iconFamily: 'Ionicons',
    shape: 'moon',
  },
};

export const getPokemonImage = (id, name) => {
  if (id && LOCAL_POKEMON_IMAGES[id]) {
    return LOCAL_POKEMON_IMAGES[id];
  }
  const cleanName = (name || '').toLowerCase().trim();
  if (cleanName && LOCAL_POKEMON_BY_NAME[cleanName]) {
    return LOCAL_POKEMON_BY_NAME[cleanName];
  }
  // Fallback to official pokeapi artwork
  return {
    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };
};

export const formatPokemonNumber = (id) => {
  if (!id) return 'N°000';
  return `N°${String(id).padStart(3, '0')}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
