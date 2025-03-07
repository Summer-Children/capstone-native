import { Badge } from '@/reusables/components/ui/badge'
import { Button } from '@/reusables/components/ui/button'
import { Input } from '@/reusables/components/ui/input'
import { Label } from '@/reusables/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/reusables/components/ui/select'
import { Text } from '@/reusables/components/ui/text'
import Footer from '@/src/shared/ui/footer'
import { useRouter } from 'expo-router'
import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AddAction(): ReactNode {
    const insets = useSafeAreaInsets()
    const router = useRouter()

    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12
    }

    const [conditionValue] = useState<string | null>(null)

    const conditions = ['Unknown', 'Failed', 'Poor', 'Fair', 'Good', 'Excellent']

    const handleDone = (): void => {
        router.push(`./review-component`)
    }

    return (
        <View className="flex-1">
            <View className="flex flex-row justify-between items-center">
                <Label>Type of action</Label>
                <Select defaultValue={{ value: 'renewal', label: 'Renewal' }}>
                    <SelectTrigger className="w-32">
                        <SelectValue
                            className="text-foreground text-sm native:text-lg"
                            placeholder="Select an action"
                        />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-32">
                        <SelectGroup>
                            <SelectItem label="Renewal" value="renewal">
                                Renewal
                            </SelectItem>
                            <SelectItem label="Repair" value="repair">
                                Repair
                            </SelectItem>
                            <SelectItem label="Maintenance" value="maintenance">
                                Maintenance
                            </SelectItem>
                            <SelectItem label="Monitor" value="monitor">
                                Monitor
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </View>

            <Label>Frequency</Label>

            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-col">
                    <Label>Last renovation</Label>
                    <Input
                        placeholder="Write a year"
                        // value={value}
                        // onChangeText={onChangeText}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                    />
                </View>

                <View className="flex flex-col">
                    <Label>Next renovation</Label>
                    <Input
                        placeholder="Write a year"
                        // value={value}
                        // onChangeText={onChangeText}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                    />
                </View>
            </View>

            <View>
                <Label>Component condition</Label>
                <View className="flex flex-row gap-x-2 flex-wrap">
                    {conditions.map(condition => (
                        <View key={condition}>
                            {/* <Pressable onPress={() => setConditionValue(condition)}> */}
                            <Badge variant={condition === conditionValue ? 'default' : 'outline'} className="px-3 py-1">
                                <Text>{condition}</Text>
                            </Badge>
                            {/* </Pressable> */}
                        </View>
                    ))}
                </View>
            </View>

            <View>
                <Label>Quantity</Label>
                <View className="flex flex-row">
                    <Input
                        // value={value}
                        // onChangeText={onChangeText}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                        className="flex-1"
                    />
                    <Select defaultValue={{ value: 'ft2', label: 'ft2' }}>
                        <SelectTrigger className="w-24">
                            <SelectValue
                                className="text-foreground text-sm native:text-lg"
                                placeholder="Select a quantity"
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className="w-24">
                            <SelectGroup>
                                <SelectItem label="ft2" value="ft2">
                                    ft2
                                </SelectItem>
                                <SelectItem label="LF" value="LF">
                                    LF
                                </SelectItem>
                                <SelectItem label="units" value="units">
                                    Units
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </View>
            </View>

            <View>
                <Label>Price per quantity</Label>
                <Input
                    // value={value}
                    // onChangeText={onChangeText}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                />
            </View>

            <View className="flex flex-row justify-between">
                <Text>Final Cost</Text>
                <Text></Text>
            </View>

            <Footer>
                <Button onPress={handleDone}>
                    <Text>Continue</Text>
                </Button>
            </Footer>
        </View>
    )
}
