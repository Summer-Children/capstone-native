import type { CodegenConfig } from '@graphql-codegen/cli'
console.log('EXPO_PUBLIC_API_URL:', process.env.EXPO_PUBLIC_API_URL)

const config: CodegenConfig = {
    schema: 'http://localhost:30033/graphql',
    // schema:process.env.EXPO_PUBLIC_API_URL ,
    verbose: true,
    documents: ['./src/**/*.{ts,tsx}'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/_gqlgen/': {
            preset: 'client'
        }
    },
    config: {
        useTypeImports: true
    }
}

export default config
