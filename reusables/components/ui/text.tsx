import * as Slot from '@rn-primitives/slot'
import type { SlottableTextProps, TextRef } from '@rn-primitives/types'
import * as React from 'react'
import { Text as RNText } from 'react-native'
import { cn } from 'reusables/lib/utils'

const TextClassContext = React.createContext<string | undefined>(undefined)
const baseTextColor = 'text-eva-blue-900'

const Text = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext)
    const Component = asChild ? Slot.Text : RNText
    return (
        <Component
            className={cn(
                'text-base text-foreground android:font-normal ios:font-normal web:select-text',
                baseTextColor,
                textClass,
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Text.displayName = 'Text'

export { Text, TextClassContext }
