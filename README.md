# Pokédex — React Native / Expo App

A mobile Pokédex built with **React Native** and **Expo** for **DCIT 324 (Mobile Application Development), Assignment 4**. The app fetches live Pokémon data from [PokéAPI](https://pokeapi.co/) and lets users browse, search, favourite, and view detailed stats for each Pokémon.

## Features

- **Home screen** — fetches and lists Pokémon on load, with a loading indicator and an error state (with retry) if the request fails
- **Search** — filter the list by Pokémon name in real time
- **Reusable `PokemonCard` component** — displays a Pokémon's number, name, and type badge(s), with a tappable favourite (heart) icon that toggles independently per card
- **Details screen** — tapping a card navigates to a full details view showing type, height, weight, and base stats, fetched live from the API
- **Bottom tab navigation** — Home and About
- **Drawer navigation** — wraps the tabs and adds Settings, Help, Support, and Logout
- **Stack navigation** — Home → Pokémon Details

## Tech Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (stack, bottom tabs, and drawer navigators)
- [PokéAPI](https://pokeapi.co/) for live Pokémon data
- [Expo Vector Icons](https://icons.expo.fyi/) (Ionicons)

## Project Structure

pokemon-app/
├── App.js # Entry point, wraps the app in navigation
├── src/
│ ├── components/
│ │ ├── PokemonCard.js # Reusable card (number, name, types, favourite)
│ │ └── Loading.js # Shared loading indicator
│ ├── constants/
│ │ ├── colors.js # Colour palette, incl. per-type colours
│ │ └── pokemon.js # Helpers: image URLs, formatting
│ ├── navigation/
│ │ ├── AppNavigator.js # Root navigator
│ │ ├── DrawerNavigator.js # Drawer: Pokédex / Settings / Help / Support / Logout
│ │ ├── TabNavigator.js # Bottom tabs: Home / About
│ │ └── HomeStack.js # Stack: Home → Pokémon Details
│ └── screens/
│   ├── HomeScreen.js
│   ├── DetailsScreen.js
│   ├── AboutScreen.js
│   ├── SettingsScreen.js
│   ├── HelpScreen.js
│   └── SupportScreen.js


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your phone, or an Android/iOS emulator

### Installation

```bash
git clone https://github.com/yawasante-dev/pokemon-app.git
cd pokemon-app
npm install
```

### Run the app

```bash
npx expo start
```

Then either:
- Scan the QR code with the **Expo Go** app on your phone, or
- Press `a` for Android emulator, `i` for iOS simulator, or `w` for web

## API Reference

All Pokémon data is fetched live from the public [PokéAPI](https://pokeapi.co/):
- List: `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`
- Details: `https://pokeapi.co/api/v2/pokemon/{id}`
- Artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

## Author

Built by [yawasante-dev](https://github.com/yawasante-dev)

## Course Information

- **Course:** DCIT 324 — Mobile Application Development
- **Assignment:** Assignment 4 — Pokédex App
- **Design Reference:** Figma mockup provided by the course

## License

This project is for academic purposes as part of a university coursework assignment.