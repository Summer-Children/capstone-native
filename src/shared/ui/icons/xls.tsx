import React, { ReactNode } from 'react'
import Svg, { G, Path, Defs, ClipPath, Rect, Text, SvgProps } from 'react-native-svg'

export function XlsIcon(props: SvgProps): ReactNode {
    const { ...rest } = props

    return (
        <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" {...rest}>
            <G clipPath="url(#clip0_1525_4337)">
                <Path
                    d="M8.65902 0C7.46833 0 6.49414 0.974194 6.49414 2.16487V32.4731C6.49414 33.6638 7.46833 34.638 8.65902 34.638H30.3078C31.4984 34.638 32.4726 33.6638 32.4726 32.4731V8.6595L23.8131 0H8.65902Z"
                    fill="#E5E5E5"
                />
                <Path
                    d="M25.9784 8.6595H32.473L23.8135 0V6.49462C23.8135 7.6853 24.7877 8.6595 25.9784 8.6595Z"
                    fill="#ACACAC"
                />
                <Path
                    d="M28.1435 28.1434C28.1435 28.7387 27.6564 29.2258 27.0611 29.2258H3.24748C2.65214 29.2258 2.16504 28.7387 2.16504 28.1434V17.319C2.16504 16.7237 2.65214 16.2366 3.24748 16.2366H27.0611C27.6564 16.2366 28.1435 16.7237 28.1435 17.319V28.1434Z"
                    fill="#489766"
                />
                <Text x="5" y="26" fontSize="10" fontWeight="bold" fill="white">
                    XLS
                </Text>
            </G>
            <Defs>
                <ClipPath id="clip0_1525_4337">
                    <Rect width="34.638" height="34.638" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}
