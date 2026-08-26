// Shared flat colour palette + spacing used across the whole app.
// Keeping this centralized means no screen hardcodes its own colours.

export const COLORS = {
  primary: "#EE1515",       // Pokedex red
  primaryDark: "#CC0000",
  background: "#F5F5F5",
  cardBackground: "#FFFFFF",
  text: "#1B1B1B",
  textLight: "#6B6B6B",
  white: "#FFFFFF",
  favourite: "#FFC107",
  border: "#E0E0E0",
  error: "#D32F2F",

  // Per-type badge colours (used on the Details screen)
  types: {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
};