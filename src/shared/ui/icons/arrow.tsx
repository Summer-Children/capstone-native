import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface ArrowIconProps extends SvgProps {
    color?: string
    size?: number
    direction?: 'up' | 'down' | 'left' | 'outward'
}

export function ArrowIcon({
    color = '#5D6368',
    size = 24,
    direction = 'left',
    className,
    ...rest
}: ArrowIconProps): ReactNode {
    let rotate = 0

    switch (direction) {
        case 'up':
            rotate = 0
            break
        case 'down':
            rotate = 180
            break
        case 'left':
            rotate = 270
            break
        case 'outward':
        default:
            rotate = 45
            break
    }

    return (
        <Svg
            className={cn('fill-current', className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            {...rest}
        >
            <Path
                d="M11.0001 7.825L6.10011 12.725C5.90011 12.925 5.66678 13.0208 5.40011 13.0125C5.13344 13.0042 4.90011 12.9 4.70011 12.7C4.51678 12.5 4.42094 12.2667 4.41261 12C4.40428 11.7333 4.50011 11.5 4.70011 11.3L11.3001 4.7C11.4001 4.6 11.5084 4.52917 11.6251 4.4875C11.7418 4.44583 11.8668 4.425 12.0001 4.425C12.1334 4.425 12.2584 4.44583 12.3751 4.4875C12.4918 4.52917 12.6001 4.6 12.7001 4.7L19.3001 11.3C19.4834 11.4833 19.5751 11.7125 19.5751 11.9875C19.5751 12.2625 19.4834 12.5 19.3001 12.7C19.1001 12.9 18.8626 13 18.5876 13C18.3126 13 18.0751 12.9 17.8751 12.7L13.0001 7.825V19C13.0001 19.2833 12.9043 19.5208 12.7126 19.7125C12.5209 19.9042 12.2834 20 12.0001 20C11.7168 20 11.4793 19.9042 11.2876 19.7125C11.0959 19.5208 11.0001 19.2833 11.0001 19V7.825Z"
                fill={color}
                transform={`rotate(${rotate}, 12, 12)`}
            />
        </Svg>
    )
}
