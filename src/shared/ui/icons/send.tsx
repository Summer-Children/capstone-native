import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface SendIconProps extends SvgProps {
    color?: string
    size?: number
    variant?: 'solid' | 'outline'
}

export function SendIcon({
    color = '#5D6368',
    size = 24,
    variant = 'outline',
    className,
    ...rest
}: SendIconProps): ReactNode {
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
                    d="M4.4 19.425C4.06667 19.5583 3.75 19.5292 3.45 19.3375C3.15 19.1458 3 18.8667 3 18.5V14L11 12L3 10V5.5C3 5.13334 3.15 4.85417 3.45 4.6625C3.75 4.47084 4.06667 4.44167 4.4 4.575L19.8 11.075C20.2167 11.2583 20.425 11.5667 20.425 12C20.425 12.4333 20.2167 12.7417 19.8 12.925L4.4 19.425Z"
                    fill={color}
                />
            ) : (
                <Path
                    d="M19.8 12.925L4.4 19.425C4.06667 19.5583 3.75 19.5292 3.45 19.3375C3.15 19.1458 3 18.8667 3 18.5V5.5C3 5.13334 3.15 4.85417 3.45 4.6625C3.75 4.47084 4.06667 4.44167 4.4 4.575L19.8 11.075C20.2167 11.2583 20.425 11.5667 20.425 12C20.425 12.4333 20.2167 12.7417 19.8 12.925ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z"
                    fill={color}
                />
            )}
        </Svg>
    )
}
