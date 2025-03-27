import { Button } from '@/reusables/components/ui/button'
import clsx from 'clsx'
import { ReactNode, forwardRef } from 'react'
import { View } from 'react-native'
import { Text } from '@/reusables/components/ui/text'

type BottomButtonProps = {
    className?: string
    children: ReactNode
} & React.ComponentProps<typeof Button>

const BottomButton = forwardRef<View, BottomButtonProps>(({ className, children, ...props }, ref) => {
    return (
        <>
            <Button ref={ref} size="lg" className={clsx(className, 'bg-eva-blue-500 rounded-xl')} {...props}>
                <Text className="text-white font-bold">{children}</Text>
            </Button>
        </>
    )
})

BottomButton.displayName = 'BottomButton'

export default BottomButton
