import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface ExclamationIconProps extends SvgProps {
    color?: string
    size?: number
}

export function ExclamationIcon({ color = '#5D6368', size = 24, className, ...rest }: ExclamationIconProps): ReactNode {
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
                d="M12 14C11.7167 14 11.4792 13.9042 11.2875 13.7125C11.0958 13.5208 11 13.2833 11 13V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V13C13 13.2833 12.9042 13.5208 12.7125 13.7125C12.5208 13.9042 12.2833 14 12 14ZM12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18C11 17.7167 11.0958 17.4792 11.2875 17.2875C11.4792 17.0958 11.7167 17 12 17C12.2833 17 12.5208 17.0958 12.7125 17.2875C12.9042 17.4792 13 17.7167 13 18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19Z"
                fill={color}
            />
        </Svg>
    )
}
