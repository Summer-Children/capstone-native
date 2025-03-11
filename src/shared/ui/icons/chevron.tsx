import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface ChevronIconProps extends SvgProps {
    color?: string
    size?: number
    direction?: 'up' | 'down' | 'left' | 'right'
}

export function ChevronIcon({
    color = '#5D6368',
    size = 24,
    direction = 'left',
    className,
    ...rest
}: ChevronIconProps): ReactNode {
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
        case 'right':
        default:
            rotate = 90
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
                d="M12.0008 10.8L8.10078 14.7C7.91745 14.8833 7.68411 14.975 7.40078 14.975C7.11745 14.975 6.88411 14.8833 6.70078 14.7C6.51745 14.5167 6.42578 14.2833 6.42578 14C6.42578 13.7167 6.51745 13.4833 6.70078 13.3L11.3008 8.7C11.5008 8.5 11.7341 8.4 12.0008 8.4C12.2674 8.4 12.5008 8.5 12.7008 8.7L17.3008 13.3C17.4841 13.4833 17.5758 13.7167 17.5758 14C17.5758 14.2833 17.4841 14.5167 17.3008 14.7C17.1174 14.8833 16.8841 14.975 16.6008 14.975C16.3174 14.975 16.0841 14.8833 15.9008 14.7L12.0008 10.8Z"
                fill={color}
                transform={`rotate(${rotate}, 12, 12)`}
            />
        </Svg>
    )
}
