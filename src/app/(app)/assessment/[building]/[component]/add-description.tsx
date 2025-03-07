import Header from '@/src/shared/ui/header'
import XButton from '@/src/shared/ui/x-button'
import { AddDescription } from '@/src/widgets/add-components/ui/add-description'

import { Stack } from 'expo-router'
import { ReactNode } from 'react'

export default function AudioDescriptionPage(): ReactNode {
    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <Header
                headerText="Component description"
                headerDescription="Describe your component status and details. We'll organize it in the report for you."
            ></Header>

            <AddDescription />
        </>
    )
}
