import type { Config } from 'tailwindcss'
import { hairlineWidth } from 'nativewind/theme'
import animate from 'tailwindcss-animate'
// @ts-expect-error no type declrations for this
import preset from 'nativewind/preset'

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx}', './reusables/**/*.{ts,tsx}'],
    presets: [preset],
    theme: {
        extend: {
            colors: {
                base: {
                    100: '#F7F9FC',
                    200: '#EDF0F7',
                    300: '#E2E7F0',
                    400: '#CBD2E0',
                    500: '#A0ABC0',
                    600: '#717D96',
                    700: '#4A5468',
                    800: '#2D3648',
                    900: '#1A202C'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--sFecondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderWidth: {
                hairline: hairlineWidth()
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [animate]
}

export default config
