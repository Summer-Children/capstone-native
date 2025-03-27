/* eslint-disable @typescript-eslint/no-require-imports */
import React, { ReactNode } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { router, usePathname } from 'expo-router'
import { HomeIcon, CheckCircleIcon, BuildingsIcon } from './icons'

const iconMap = {
    Home: HomeIcon,
    Assessment: CheckCircleIcon,
    Buildings: BuildingsIcon
} as const

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Assessment', href: '/buildings' },
    { name: 'Buildings', href: '/buildings/archive-list' },
    { name: 'Profile', href: '/user' }
] as const

const NavItem = ({ name, href }: (typeof navItems)[number]): ReactNode => {
    const pathname = usePathname()
    const isActive = pathname === href
    const NavIcon = iconMap[name as keyof typeof iconMap]

    const handlePress = (): void => {
        if (!isActive) {
            if (name === 'Assessment' || name === 'Profile') {
                router.push(href)
            } else {
                router.replace(href)
            }
        }
    }

    return (
        <TouchableOpacity className="flex-1 items-center justify-center" onPress={handlePress} disabled={isActive}>
            <View
                className={`w-11 h-11 flex items-center justify-center rounded-full ${isActive ? 'bg-eva-blue-50' : ''}`}
            >
                {name === 'Profile' ? (
                    <Image
                        source={require('@/assets/images/avatar.png')}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                    />
                ) : (
                    NavIcon && (
                        <NavIcon
                            size={24}
                            color={isActive ? '#0251FF' : '#5D6368'}
                            variant={isActive ? 'solid' : 'outline'}
                        />
                    )
                )}
            </View>
            <Text className={`text-xs font-semibold ${isActive ? 'text-eva-blue-500' : 'text-eva-black-300'}`}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export function BottomNavigation(): ReactNode {
    return (
        <View className="flex-row justify-around items-center py-3 bg-white border-t border-eva-white-100">
            {navItems.map(item => (
                <NavItem key={item.name} {...item} />
            ))}
        </View>
    )
}
