import React, { ReactNode } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import cn from 'clsx'

interface SearchIconProps extends SvgProps {
    color?: string
    size?: number
}

export function SearchIcon({ color = '#5D6368', size = 24, className, ...rest }: SearchIconProps): ReactNode {
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
                d="M16.6267 15.5129L19.4431 18.3292C19.7506 18.6368 19.7506 19.1355 19.4431 19.4431C19.1355 19.7506 18.6368 19.7506 18.3292 19.4431L15.5129 16.6267C14.3 17.5971 12.7618 18.1776 11.0888 18.1776C7.17579 18.1776 4 15.0018 4 11.0888C4 7.17579 7.17579 4 11.0888 4C15.0018 4 18.1776 7.17579 18.1776 11.0888C18.1776 12.7618 17.5971 14.3 16.6267 15.5129ZM15.0465 14.9284C16.0096 13.9358 16.6023 12.5819 16.6023 11.0888C16.6023 8.04259 14.135 5.57529 11.0888 5.57529C8.04259 5.57529 5.57529 8.04259 5.57529 11.0888C5.57529 14.135 8.04259 16.6023 11.0888 16.6023C12.5819 16.6023 13.9358 16.0096 14.9284 15.0465L15.0465 14.9284Z"
                fill={color}
            />
        </Svg>
    )
}
