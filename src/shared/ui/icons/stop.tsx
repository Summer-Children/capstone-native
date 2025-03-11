import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface StopIconProps extends SvgProps {
    color?: string
    size?: number
    variant?: 'solid' | 'outline'
}

export function StopIcon({
    color = '#5D6368',
    size = 24,
    variant = 'outline',
    className,
    ...rest
}: StopIconProps): ReactNode {
    return (
        <Svg
            className={cn('fill-current', className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            {...rest}
        >
            {variant === 'solid' ? (
                <Path
                    d="M6 16V8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6H16C16.55 6 17.0208 6.19583 17.4125 6.5875C17.8042 6.97917 18 7.45 18 8V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H8C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16Z"
                    fill={color}
                />
            ) : (
                <Path
                    d="M6 16V8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6H16C16.55 6 17.0208 6.19583 17.4125 6.5875C17.8042 6.97917 18 7.45 18 8V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H8C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16ZM8 16H16V8H8V16Z"
                    fill={color}
                />
            )}
        </Svg>
    )
}
