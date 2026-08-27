export const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const capitalize = (text) => {
  if (!text) return '';

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPokemonNumber = (id) => {
  return `N°${String(id).padStart(3, '0')}`;
};

// Small Ionicons glyph per type, so badges match the Figma design
// (each type pill has a little icon before the label).
export const TYPE_ICONS = {
  normal: 'radio-button-on-outline',
  fire: 'flame',
  water: 'water',
  electric: 'flash',
  grass: 'leaf',
  ice: 'snow',
  fighting: 'fitness',
  poison: 'skull',
  ground: 'earth',
  flying: 'airplane',
  psychic: 'eye',
  bug: 'bug',
  rock: 'diamond',
  ghost: 'moon',
  dragon: 'flame',
  dark: 'moon',
  steel: 'shield',
  fairy: 'sparkles',
};