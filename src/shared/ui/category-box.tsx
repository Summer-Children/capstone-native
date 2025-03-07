import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/reusables/components/ui/card'
import { Text } from '@/reusables/components/ui/text'
import { ReactNode } from 'react'

export function CategoryBox(): ReactNode {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex justify-between">
                <CardTitle>Building Enclosure</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Text>Card Content</Text>
            </CardContent>
            <CardFooter>
                <Text>Card Footer</Text>
            </CardFooter>
        </Card>
    )
}
