import type { Config } from 'tailwindcss'
import { hairlineWidth } from 'nativewind/theme'
import animate from 'tailwindcss-animate'
// @ts-expect-error no type declarations for this
import preset from 'nativewind/preset'

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx}', './reusables/**/*.{ts,tsx}'],
    presets: [preset],
    theme: {
        extend: {
            colors: {
                eva: {
                    white: {
                        50: '#FCFCFC',
                        100: '#F1F1F1',
                        200: '#E5E5E5',
                        300: '#DADADA',
                        400: '#CECECE',
                        500: '#C3C3C3',
                        600: '#B8B8B8',
                        700: '#ACACAC',
                        800: '#A1A1A1',
                        900: '#959595',
                        950: '#8A8A8A'
                    },
                    black: {
                        50: '#7E858C',
                        100: '#737A80',
                        200: '#686E74',
                        300: '#5D6368',
                        400: '#52575C',
                        500: '#474C50',
                        600: '#3C4044',
                        700: '#323537',
                        800: '#27292B',
                        900: '#1C1D1F',
                        950: '#111213'
                    },
                    blue: {
                        50: '#E8EFFF',
                        100: '#BACFFF',
                        200: '#8CAFFF',
                        300: '#5E90FF',
                        400: '#3070FF',
                        500: '#0251FF',
                        600: '#0342D0',
                        700: '#0534A1',
                        800: '#052672',
                        900: '#041846',
                        950: '#02091A'
                    }
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
                    foreground: 'hsl(var(--secondary-foreground))'
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
            fontFamily: {
                figtree: ['Figtree', 'sans-serif']
            },
            boxShadow: {
                'home-card': '0px 6px 12px rgba(0, 0, 0, 0.08)'
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
