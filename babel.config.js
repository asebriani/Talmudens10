module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ['module-resolver', {
          root: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@assets':     './assets',
            '@features':   './src/features',
            '@navigation': './src/navigation',
            '@utils':      './src/utils',
          },
        }],
      ],
    };
  };
  