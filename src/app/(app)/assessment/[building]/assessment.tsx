import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import Header from '@/src/shared/ui/header'
import { Stack, useLocalSearchParams, Link } from 'expo-router'
import { ReactNode, useEffect, useState } from 'react'
import { View, FlatList, Image } from 'react-native'
import { CirclePlus } from 'lucide-react-native'
import XButton from '@shared/ui/x-button'
import Footer from '@/src/shared/ui/footer'

export default function BuildingAssessmentPage(): ReactNode {
    const buildingName = useLocalSearchParams()['building'] ?? ''

    const [title, setTitle] = useState('')
    const [components, setComponents] = useState<{ name: string; image: string }[]>([])

    // TODO: replace the following with an API call（fetching the assessment_report.detail.component data）
    useEffect(() => {
        if (buildingName) {
            setTitle(String(buildingName))
        }

        const fetchData = (): void => {
            const components = [
                { name: 'Exterior wooden stairs', image: 'https://example.com/image1.jpg' },
                { name: 'Interior doors', image: 'https://example.com/image2.jpg' },
                { name: 'Boilerss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilerssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' },
                { name: 'Boilersssss', image: 'https://example.com/image3.jpg' }
            ]
            setComponents(components)
        }

        fetchData()
    }, [buildingName])

    return (
        <View className="flex-1">
            <Stack.Screen options={{ headerTitle: () => <Text>{title}</Text>, headerRight: () => <XButton /> }} />
            <Header
                headerText="Building assessment"
                headerDescription="Create components, capture its pictures, and describe all of them using your voice."
            ></Header>

            <View className="flex-row items-center justify-between">
                <Text>Components</Text>

                {components.length > 0 && (
                    <Link href={`./add-component`} asChild>
                        <Button variant="default">
                            <Text> Add a component</Text>
                        </Button>
                    </Link>
                )}
            </View>

            <View className="h-2/3 py-4">
                {components.length === 0 && (
                    <Link href={`/assessment/${buildingName as string}/add-component`} asChild>
                        <Button variant="link" className="flex-row gap-5 items-center justify-start ">
                            <CirclePlus></CirclePlus>
                            <Text>Add a component</Text>
                        </Button>
                    </Link>
                )}

                <FlatList
                    data={components}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center py-2">
                            <Image source={{ uri: item.image }} className="w-10 h-10 mr-2" />
                            <Text>{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            <Footer>
                {components.length > 0 ? (
                    <Link href={`./review/`} asChild>
                        <Button>
                            <Text>Confirm components</Text>
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        <Text>Confirm components</Text>
                    </Button>
                )}
            </Footer>

            <Footer>
                {components.length > 0 ? (
                    <Link href={`./review/`} asChild>
                        <Button>
                            <Text>Confirm components</Text>
                        </Button>
                    </Link>
                ) : (
                    <Button disabled>
                        <Text>Confirm components</Text>
                    </Button>
                )}
            </Footer>
        </View>
    )
}
