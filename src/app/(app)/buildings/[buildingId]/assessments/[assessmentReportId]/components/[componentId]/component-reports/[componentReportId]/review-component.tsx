import { Button } from '@/reusables/components/ui/button'
import { Input } from '@/reusables/components/ui/input'
import { Label } from '@/reusables/components/ui/label'
import { Textarea } from '@/reusables/components/ui/textarea'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { Link } from 'expo-router'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { Text } from 'reusables/components/ui/text'

export default function ReviewComponentPage(): ReactNode {
    return (
        <View className="flex-1">
            <Header headerText={'Component review'} />

            <Label nativeID="name">Name</Label>
            <Input
                // value={value}
                // onChangeText={onChangeText}
                aria-labelledby="name"
                aria-errormessage="inputError"
            />

            <Label>Photos</Label>
            <Link href="./add-photos" asChild>
                <Button>
                    <Text>Add more photos</Text>
                </Button>
            </Link>

            {/* TODO: Card componentを使ってcomponentを独立で作るか。 */}
            <View className="flex flex-row justify-between">
                <Label>Description </Label>
                <Button variant="link" size="sm">
                    <Text>Edit</Text>
                </Button>
            </View>
            <Textarea
                // ref={inputRef}
                // value={value}
                // onChangeText={setValue}
                aria-labelledby="textareaLabel"
            />

            <View className="flex flex-row justify-stretch items-center">
                <Label>Activity</Label>
                <Button variant="link" size="sm">
                    <Text>Edit</Text>
                </Button>
            </View>
            <View className="flex flex-row justify-stretch items-center">
                <Label>Action</Label>
                <Input className="w-full" />
            </View>
            <View className="flex flex-row justify-stretch items-center">
                <Label>Frequency</Label>
                <Input className="w-full" />
            </View>
            <View className="flex flex-row justify-stretch ites-center">
                <Label>Next renovation</Label>
                <Input className="w-full" />
            </View>
            <View className="flex flex-row justify-stretch items-center ">
                <Label>Component condition</Label>
                <Input className="w-full" />
            </View>

            <Footer>
                <Link href="../assessment" asChild>
                    <Button>
                        <Text>Continue to finish</Text>
                    </Button>
                </Link>

                <Link href={'../add-component'} asChild>
                    <Button variant="link">
                        <Text>Add another component</Text>
                    </Button>
                </Link>
            </Footer>
        </View>
    )
}
