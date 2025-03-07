import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { Link } from 'expo-router'
import { ComboBox } from '@shared/ui/combo-box'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'

export default function SelectBuildingPage(): ReactNode {
    const [buildingInput, setBuildingInput] = useState<string | null>(null)

    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const buildings = ['490 Griffith Place', 'Sunset Towers', 'Ocean View Apartments']

    const isRegisteredBuilding =
        buildingInput && buildings.some(building => building.toLowerCase() === buildingInput.toLowerCase())

    return (
        <View className="flex-1">
            <Header headerText="First select your building" />

            <ComboBox
                placeholder="Search for a building"
                options={buildings}
                value={buildingInput ?? ''}
                onChangeText={text => {
                    setBuildingInput(text.trim())
                }}
                onSelect={item => {
                    setBuildingInput(item)
                    setDropdownVisible(false)
                }}
                isDropdownVisible={isDropdownVisible}
                setDropdownVisible={setDropdownVisible}
            />

            {/* NOTE: If a user selects or types the building which is already registered, the "Continue" button with Link will be displayed. */}
            <Footer>
                {isRegisteredBuilding ? (
                    <Link
                        href={{
                            pathname: './assessment/[building]/assessment',
                            params: { building: buildingInput?.replace(/\s+/g, '-') }
                        }}
                        asChild
                    >
                        <Button variant="default">
                            <Text>Continue</Text>
                        </Button>
                    </Link>
                ) : buildingInput && !isDropdownVisible ? (
                    <View className="mt-4">
                        <Text className="text-red-500 text-sm mb-2">Not found. Create this building</Text>
                        {/* TODO: update the following href once the route for a page where a user can create a new building is defined */}

                        <Link href="///" asChild>
                            <Button variant="default" onPress={() => console.log('Redirect to Create a building')}>
                                <Text>Create this building</Text>
                            </Button>
                        </Link>
                    </View>
                ) : (
                    <Button variant="default" disabled>
                        <Text>Continue</Text>
                    </Button>
                )}
            </Footer>
        </View>
    )
}
