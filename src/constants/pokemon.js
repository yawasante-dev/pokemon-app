export const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const capitalize = (text) => {
  if (!text) return '';

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPokemonNumber = (id) => {
  return `#${String(id).padStart(3, '0')}`;
};