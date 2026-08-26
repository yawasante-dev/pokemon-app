# pokemon-app
Explore and discover Pokémon with a fully built React Native mobile app.
# 📱 Pokédex

> A clean, searchable Pokémon browser built with React Native and Expo.

![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)
![React Native 0.81](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

**pokemon-app** is a mobile Pokédex built with **React Native** and **Expo**, pulling live data from [PokéAPI](https://pokeapi.co/). Browse Pokémon, search by name, favorite your picks, and dive into detailed stats — all wrapped in a drawer + tab + stack navigation setup. It started life as a project for **DCIT 324 – Mobile Application Development**.

## Contents
- [Features](#features)
- [Screens](#screens)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Known Limitations & Ideas for Next Steps](#known-limitations--ideas-for-next-steps)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- 🔍 **Live Pokémon data** — fetched straight from PokéAPI, nothing hardcoded
- 🔎 **Instant search** — filter the list by name as you type
- ❤️ **Favorites** — tap the heart on any card to mark it as a favorite
- 📊 **Detailed stats** — type, height, weight, and base stats with progress bars
- 🎨 **Type-based color coding** — cards and detail screens are tinted by the Pokémon's primary type
- ↻ **Pull-to-refresh**, plus a dedicated error state with a retry button
- 🗂️ **Drawer navigation** — Pokédex, Settings, Help, and Support, each with its own icon
- 🌐 **Cross-platform** — iOS, Android, and web from a single Expo codebase

## Screens
| Screen | How to get there | What it shows |
|---|---|---|
| **Home** | Drawer → Pokédex → Home tab | Searchable list of 30 Pokémon with number, name, types, and a favorite toggle |
| **Details** | Tap any Pokémon card | Artwork, types, height, weight, and base stats for that Pokémon |
| **About** | Bottom tab bar | What the app is and the stack it's built with |
| **Settings** | Drawer | Notification and dark mode switches *(UI only — see [Limitations](#known-limitations--ideas-for-next-steps))* |
| **Help** | Drawer | Quick instructions for searching, viewing details, and favoriting |
| **Support** | Drawer | Basic troubleshooting copy and a credit to PokéAPI |

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | [Expo](https://expo.dev) ~54 · React Native 0.81 · React 19.1 · New Architecture enabled |
| Navigation | [React Navigation](https://reactnavigation.org) — drawer, bottom tabs, and native stack |
| Icons | `@expo/vector-icons` (Ionicons) |
| Gestures & animation | `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets` |
| Data source | [PokéAPI](https://pokeapi.co/api/v2/pokemon) (REST) |
| Artwork | Official artwork sprites from the [PokéAPI sprites repo](https://github.com/PokeAPI/sprites) |
| Language | JavaScript — no TypeScript, no test suite currently |

## Project Structure
```
pokemon-app/
├── App.js                    # Root component — wraps navigation in gesture + container providers
├── index.js                  # Expo entry point, registers the root component
├── app.json                  # Expo config: name, icons, splash screen, platform settings
├── babel.config.js           # Babel preset for Expo
├── assets/                   # App icon, adaptive icon, splash screen, favicon
└── src/
    ├── components/
    │   ├── Loading.js         # Reusable spinner + message
    │   └── PokemonCard.js     # List item: name, number, types, favorite button
    ├── constants/
    │   ├── colors.js          # App palette + per-type Pokémon colors
    │   └── pokemon.js         # Helpers: artwork URL builder, capitalize(), #001-style numbering
    ├── navigation/
    │   ├── AppNavigator.js     # Top-level navigator
    │   ├── DrawerNavigator.js  # Side drawer: Pokédex / Settings / Help / Support / Logout
    │   ├── TabNavigator.js     # Bottom tabs: Home / About
    │   └── HomeStack.js        # Stack: Home list → Pokémon details
    └── screens/
        ├── HomeScreen.js       # Pokémon list, search, favorites
        ├── DetailsScreen.js    # Single Pokémon's full details
        ├── AboutScreen.js      # App info
        ├── SettingsScreen.js   # Notification / dark mode switches
        ├── HelpScreen.js       # Static help text
        └── SupportScreen.js    # Static support text
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 20.19.4 or newer (required by Expo SDK 54 / React Native 0.81)
- npm (ships with Node)
- The [Expo Go](https://expo.dev/go) app on your phone, **or** an iOS Simulator / Android Emulator set up locally

### Installation
```bash
# Clone or unzip the project, then:
cd pokemon-app
npm install
```

### Running the app
```bash
npm start        # Starts Metro + the Expo dev tools — scan the QR code with Expo Go
npm run android   # Opens in a connected Android device or emulator
npm run ios       # Opens in the iOS Simulator (macOS only)
npm run web       # Runs in the browser via react-native-web
```

An internet connection is required at runtime — every screen that shows Pokémon data fetches it live from PokéAPI.

## How It Works

**Navigation hierarchy:**
```
NavigationContainer
└── DrawerNavigator                Pokédex · Settings · Help · Support · Logout
    ├── TabNavigator  ("Pokédex")  Home tab · About tab
    │   ├── HomeStack
    │   │   ├── HomeScreen         the searchable list
    │   │   └── DetailsScreen      pushed on tap
    │   └── AboutScreen
    ├── SettingsScreen
    ├── HelpScreen
    ├── SupportScreen
    └── "Logout"                   redirects straight back to Pokédex (placeholder — no auth in the app)
```

**Data flow:**
1. `HomeScreen` calls `GET /pokemon?limit=30&offset=0`, then fetches each result's detail URL in parallel so every card can show its types immediately.
2. Typing in the search box filters the already-loaded list on the client — it doesn't re-query the API.
3. Tapping a card navigates to `DetailsScreen` with the Pokémon's `id`, which independently fetches `GET /pokemon/{id}`.
4. Artwork URLs are built directly from a Pokémon's `id` against the PokéAPI sprites repo, rather than using the sprite URLs embedded in the API response.

## Known Limitations & Ideas for Next Steps
- **Favorites and Settings don't persist.** Both live in local component state, so they reset on every app restart — adding `AsyncStorage` (or a lightweight store) would fix that.
- **Home only ever loads the first 30 Pokémon.** Infinite scroll or paginated fetching would let the list cover the full national Pokédex.
- **"Dark Mode" is a switch, not a theme yet** — flipping it doesn't currently change the app's appearance.
- **"Logout" is a placeholder** that just navigates back to the Pokédex tab; there's no authentication layer in the app.
- **Home and Details fetch independently.** Sharing state (context, or a small query cache) would avoid re-fetching a Pokémon's data when opening its details.

## License
Distributed under the **MIT License** — see [`LICENSE`](./LICENSE) for the full text.

## Acknowledgments
- [PokéAPI](https://pokeapi.co/) for the Pokémon data and artwork
- [Ionicons](https://ionic.io/ionicons) via `@expo/vector-icons`
- [React Navigation](https://reactnavigation.org) for the drawer/tab/stack setup
