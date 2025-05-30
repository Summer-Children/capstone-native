import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface PlayIconProps extends SvgProps {
    color?: string
    size?: number
    variant?: 'solid' | 'outline'
}

export function PlayIcon({
    color = '#5D6368',
    size = 24,
    variant = 'outline',
    className,
    ...rest
}: PlayIconProps): ReactNode {
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
                    d="M7.89062 16.5758V6.22577C7.89062 5.94244 7.99063 5.70494 8.19063 5.51327C8.39063 5.3216 8.62396 5.22577 8.89062 5.22577C8.97396 5.22577 9.06146 5.23827 9.15313 5.26327C9.24479 5.28827 9.33229 5.32577 9.41562 5.37577L17.5656 10.5508C17.7156 10.6508 17.8281 10.7758 17.9031 10.9258C17.9781 11.0758 18.0156 11.2341 18.0156 11.4008C18.0156 11.5674 17.9781 11.7258 17.9031 11.8758C17.8281 12.0258 17.7156 12.1508 17.5656 12.2508L9.41562 17.4258C9.33229 17.4758 9.24479 17.5133 9.15313 17.5383C9.06146 17.5633 8.97396 17.5758 8.89062 17.5758C8.62396 17.5758 8.39063 17.4799 8.19063 17.2883C7.99063 17.0966 7.89062 16.8591 7.89062 16.5758Z"
                    fill={color}
                />
            ) : (
                <Path
                    d="M8 17.175V6.825C8 6.54167 8.1 6.30417 8.3 6.1125C8.5 5.92083 8.73333 5.825 9 5.825C9.08333 5.825 9.17083 5.8375 9.2625 5.8625C9.35417 5.8875 9.44167 5.925 9.525 5.975L17.675 11.15C17.825 11.25 17.9375 11.375 18.0125 11.525C18.0875 11.675 18.125 11.8333 18.125 12C18.125 12.1667 18.0875 12.325 18.0125 12.475C17.9375 12.625 17.825 12.75 17.675 12.85L9.525 18.025C9.44167 18.075 9.35417 18.1125 9.2625 18.1375C9.17083 18.1625 9.08333 18.175 9 18.175C8.73333 18.175 8.5 18.0792 8.3 17.8875C8.1 17.6958 8 17.4583 8 17.175ZM10 15.35L15.25 12L10 8.65V15.35Z"
                    fill={color}
                />
            )}
        </Svg>
    )
}
