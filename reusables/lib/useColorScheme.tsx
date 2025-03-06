/* eslint-disable @typescript-eslint/unbound-method */
import { useColorScheme as useNativewindColorScheme } from 'nativewind'

type ColorScheme = {
    colorScheme: 'dark' | 'light'
    isDarkColorScheme: boolean
    setColorScheme: (theme: ColorScheme['colorScheme']) => void
    toggleColorScheme: () => void
}

export function useColorScheme(): ColorScheme {
    const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme()
    return {
        colorScheme: colorScheme ?? 'dark',
        isDarkColorScheme: colorScheme === 'dark',
        setColorScheme,
        toggleColorScheme
    }
}
