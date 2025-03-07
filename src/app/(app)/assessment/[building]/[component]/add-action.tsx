import Header from '@/src/shared/ui/header'
import XButton from '@/src/shared/ui/x-button'
import AddAction from '@/src/widgets/add-components/ui/add-action'

import { Stack } from 'expo-router'
import { ReactNode } from 'react'

export default function AddActionPage(): ReactNode {
    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <Header
                headerText="Action"
                headerDescription="Describe the condition of this component and recommend the necessary actions."
            ></Header>

            <AddAction></AddAction>
        </>
    )
}
