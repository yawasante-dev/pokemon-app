const COLORS = {
  background: '#F5F6FA',
  white: '#FFFFFF',
  black: '#1D1D1F',
  dark: '#242424',
  gray: '#777777',
  lightGray: '#E8E8E8',
  red: '#E53935',
  blue: '#4A90E2',
  green: '#4CAF50',
  yellow: '#F5C542',
  purple: '#8E6CCB',

  // Sampled directly from the Figma design (pixel colours from the
  // Pokemon detail cards), so badges/boxes match the reference exactly.
  type: {
    normal: '#919AA2',
    fire: '#FF9D55',
    water: '#5090D6',
    electric: '#F4D23C',
    grass: '#63BC5A',
    ice: '#73CEC0',
    fighting: '#CE416B',
    poison: '#B567CE',
    ground: '#D97845',
    flying: '#89AAE3',
    psychic: '#FA7179',
    bug: '#91C12F',
    rock: '#C5B78C',
    ghost: '#5269AD',
    dragon: '#0B6DC3',
    dark: '#5A5465',
    steel: '#5A8EA2',
    fairy: '#EC8FE6',
  },
};

// Converts a "#RRGGBB" hex string into an "rgba(r, g, b, alpha)" string.
// Used to get the soft pastel card backgrounds seen in the Figma design
// (a light tint of the Pokemon's type colour) without hardcoding a
// second full palette of pastel hex codes.
export const withAlpha = (hex, alpha) => {
  const parsed = hex.replace('#', '');
  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default COLORS;