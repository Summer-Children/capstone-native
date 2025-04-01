import { Button } from '@/reusables/components/ui/button'
import clsx from 'clsx'
import { ReactNode, forwardRef } from 'react'
import { View } from 'react-native'
import { Text } from '@/reusables/components/ui/text'

type BottomButtonProps = {
    className?: string
    children: ReactNode
    disabled?: boolean
} & React.ComponentProps<typeof Button>

const BottomButton = forwardRef<View, BottomButtonProps>(({ className, children, disabled, ...props }, ref) => {
    return (
        <>
            <Button
                ref={ref}
                disabled={disabled ?? false}
                size="lg"
                className={clsx(className, 'bg-eva-blue-500 rounded-xl disabled:bg-eva-white-200')}
                {...props}
            >
                <Text className="text-white font-semibold">{children}</Text>
            </Button>
        </>
    )
})

BottomButton.displayName = 'BottomButton'

export default BottomButton
