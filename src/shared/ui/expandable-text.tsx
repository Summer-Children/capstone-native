import { useState, useCallback } from 'react'
import { Pressable, View, NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { Text } from '@/reusables/components/ui/text'

interface ExpandableTextProps {
    text: string
    initialLines?: number
    className?: string
}

const ExpandableText = ({ text, initialLines = 2, className = 'text-gray-700' }: ExpandableTextProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [numberOfLines, setNumberOfLines] = useState(0)

    const onTextLayout = useCallback(
        (e: NativeSyntheticEvent<TextLayoutEventData>): void => {
            if (!isExpanded) {
                setNumberOfLines(e.nativeEvent.lines.length)
            }
        },
        [isExpanded]
    )

    return (
        <View>
            <Text
                numberOfLines={isExpanded ? undefined : initialLines}
                className={className}
                onTextLayout={onTextLayout}
                style={{
                    width: '100%'
                }}
            >
                {text}
            </Text>

            {numberOfLines >= initialLines && (
                <Pressable onPress={() => setIsExpanded(!isExpanded)} className="mt-1">
                    <Text className="text-blue-500">{isExpanded ? 'Show Less' : 'Show More'}</Text>
                </Pressable>
            )}
        </View>
    )
}

export default ExpandableText
