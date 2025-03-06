/* eslint-disable */
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname, {
    // Add this if you need it
    isCSSEnabled: true
})

module.exports = withNativeWind(config, { input: './src/app/index.css' })
