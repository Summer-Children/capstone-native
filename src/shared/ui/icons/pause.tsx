import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface PauseIconProps extends SvgProps {
    color?: string
    size?: number
}

export function PauseIcon({ color = '#5D6368', size = 24, className, ...rest }: PauseIconProps): ReactNode {
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
                d="M8 7C8 6.44772 8.44772 6 9 6C9.55228 6 10 6.44772 10 7V17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17V7Z"
                fill={color}
            />
            <Path
                d="M14 7C14 6.44772 14.4477 6 15 6C15.5523 6 16 6.44772 16 7V17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17V7Z"
                fill={color}
            />
        </Svg>
    )
}
