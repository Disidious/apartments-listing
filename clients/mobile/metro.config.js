const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const extraNodeModules = {
    'shared': path.resolve(__dirname + '/../shared'),
};

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
    },
})
config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
    get: (target, name) =>
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
})
config.watchFolders = [
    path.resolve(__dirname + '/../shared')
];

module.exports = config;