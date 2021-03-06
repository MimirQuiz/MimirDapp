const extraNodeModules = require('node-libs-browser');

module.exports = {
  resolver: {
    extraNodeModules,
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
