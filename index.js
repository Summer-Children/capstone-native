import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function App() {
    // eslint-disable-next-line no-undef
    const ctx = require.context('./src/app')
    return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
