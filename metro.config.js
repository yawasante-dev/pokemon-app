const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Force reanimated v4 and worklets to resolve from their pre-compiled
// lib/module builds instead of raw TypeScript sources.
// Without this, Metro follows the "react-native" field in their package.json
// which points to uncompiled src/ and causes resolution failures.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-reanimated') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/react-native-reanimated/lib/module/index.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName === 'react-native-worklets') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/react-native-worklets/lib/module/index.js'),
      type: 'sourceFile',
    };
  }
  // Fall back to the standard Metro resolution for everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
