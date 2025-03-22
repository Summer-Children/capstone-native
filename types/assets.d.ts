/// <reference types="react-native" />

declare module '*.gif' {
    const content: ImageSourcePropType
    export default content
}

declare module '*.svg' {
    import { SvgProps } from 'react-native-svg'
    const content: React.FC<SvgProps>
    export default content
}
