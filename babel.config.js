// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default api => {
    api.cache(true)

    return {
        presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],

        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],

                    alias: {
                        '@': './',
                        'tailwind.config': './tailwind.config.ts'
                    }
                }
            ]
        ]
    }
}
