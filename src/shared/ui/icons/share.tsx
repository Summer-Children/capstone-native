import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface ShareIconProps extends SvgProps {
    color?: string
    size?: number
}

export function ShareIcon({ color = '#5D6368', size = 24, className, ...rest }: ShareIconProps): ReactNode {
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
                d="M11.2929 3.7072C11.6834 3.31668 12.3166 3.31668 12.7071 3.7072L17.5 8.50009C17.8905 8.89061 17.8905 9.52377 17.5 9.91429C17.1095 10.3048 16.4763 10.3048 16.0858 9.91429L13 6.82851V15.4143C13 15.9666 12.5523 16.4143 12 16.4143C11.4477 16.4143 11 15.9666 11 15.4143V6.82851L7.9142 9.91429C7.52368 10.3048 6.89053 10.3048 6.50001 9.9143C6.10948 9.52378 6.10948 8.89061 6.5 8.50008L11.2929 3.7072ZM3 18.4143V15.4143C3 14.862 3.44772 14.4143 4 14.4143C4.55228 14.4143 5 14.862 5 15.4143V18.4143C5 18.9666 5.44772 19.4143 6 19.4143H18C18.5523 19.4143 19 18.9666 19 18.4143V15.4143C19 14.862 19.4477 14.4143 20 14.4143C20.5523 14.4143 21 14.862 21 15.4143V18.4143C21 20.0712 19.6569 21.4143 18 21.4143H6C4.34315 21.4143 3 20.0712 3 18.4143Z"
                fill={color}
            />
        </Svg>
    )
}
