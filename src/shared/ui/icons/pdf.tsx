import React, { ReactNode } from 'react'
import Svg, { G, Path, Defs, ClipPath, Rect, Text, SvgProps } from 'react-native-svg'

export function PdfIcon(props: SvgProps): ReactNode {
    const { ...rest } = props

    return (
        <Svg width="36" height="35" viewBox="0 0 36 35" fill="none" {...rest}>
            <G clipPath="url(#clip0_1525_4329)">
                <Path
                    d="M9.62288 0C8.4322 0 7.45801 0.974194 7.45801 2.16487V32.4731C7.45801 33.6638 8.4322 34.638 9.62288 34.638H31.2716C32.4623 34.638 33.4365 33.6638 33.4365 32.4731V8.6595L24.777 0H9.62288Z"
                    fill="#E5E5E5"
                />
                <Path
                    d="M26.9422 8.6595H33.4368L24.7773 0V6.49462C24.7773 7.6853 25.7515 8.6595 26.9422 8.6595Z"
                    fill="#ACACAC"
                />
                <Path
                    d="M29.1074 28.1434C29.1074 28.7387 28.6203 29.2258 28.025 29.2258H4.21134C3.616 29.2258 3.12891 28.7387 3.12891 28.1434V17.319C3.12891 16.7237 3.616 16.2366 4.21134 16.2366H28.025C28.6203 16.2366 29.1074 16.7237 29.1074 17.319V28.1434Z"
                    fill="#EF4444"
                />
                <Text x="6" y="26" fontSize="10" fontWeight="bold" fill="white">
                    PDF
                </Text>
            </G>
            <Defs>
                <ClipPath id="clip0_1525_4329">
                    <Rect width="34.638" height="34.638" fill="white" transform="translate(0.963867)" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}
