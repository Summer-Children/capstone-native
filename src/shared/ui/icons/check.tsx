import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface CheckIconProps extends SvgProps {
    color?: string
    size?: number
}

export function CheckIcon({ color = '#5D6368', size = 24, className, ...rest }: CheckIconProps): ReactNode {
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
                d="M9.54972 15.15L18.0247 6.675C18.2247 6.475 18.4581 6.375 18.7247 6.375C18.9914 6.375 19.2247 6.475 19.4247 6.675C19.6247 6.875 19.7247 7.1125 19.7247 7.3875C19.7247 7.6625 19.6247 7.9 19.4247 8.1L10.2497 17.3C10.0497 17.5 9.81639 17.6 9.54972 17.6C9.28305 17.6 9.04972 17.5 8.84972 17.3L4.54972 13C4.34972 12.8 4.25389 12.5625 4.26222 12.2875C4.27055 12.0125 4.37472 11.775 4.57472 11.575C4.77472 11.375 5.01222 11.275 5.28722 11.275C5.56222 11.275 5.79972 11.375 5.99972 11.575L9.54972 15.15Z"
                fill={color}
            />
        </Svg>
    )
}
