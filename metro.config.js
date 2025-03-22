/* eslint-disable */
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname, {
    // Add this if you need it
    isCSSEnabled: true
})

config.transformer={
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native')

}

config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'svg']
}

module.exports = withNativeWind(config, { input: './src/app/index.css' })
