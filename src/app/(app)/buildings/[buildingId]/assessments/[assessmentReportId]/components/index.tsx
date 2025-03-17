import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import Header from '@/src/shared/ui/header'
import { Stack, useLocalSearchParams, Link } from 'expo-router'
import { type ReactNode, useState } from 'react'
import { View, FlatList } from 'react-native'
import { CirclePlus } from 'lucide-react-native'
import XButton from '@shared/ui/x-button'
import Footer from '@/src/shared/ui/footer'
import { GET_COMPONENTS } from '@/src/entities/component/hook'
import { useQuery } from '@apollo/client'

export default function BuildingAssessmentPage(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()
    console.log({ buildingId, assessmentReportId })

    const [title] = useState('')
    const { data, loading, error } = useQuery(GET_COMPONENTS, {
        variables: { buildingId: buildingId.toString() },
        fetchPolicy: 'network-only',
        onCompleted: d => {
            console.log('completed', d)
        }
    })

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        throw error
    }

    return (
        <View className="flex-1">
            <Stack.Screen options={{ headerTitle: () => <Text>{title}</Text>, headerRight: () => <XButton /> }} />
            <Header
                headerText="Building assessment"
                headerDescription="Create components, capture its pictures, and describe all of them using your voice."
            />

            <View className="flex-row items-center justify-between">
                <Text>Components</Text>
                {data && data.res.length > 0 && (
                    <Link
                        href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/components/add-component`}
                        asChild
                    >
                        <Button variant="default">
                            <Text> Add a component</Text>
                        </Button>
                    </Link>
                )}
            </View>

            <View className="h-2/3 py-4">
                {data && data.res.length === 0 && (
                    <Link
                        href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/components/add-component`}
                        asChild
                    >
                        <Button variant="link" className="flex-row gap-5 items-center justify-start ">
                            <CirclePlus />
                            <Text>Add a component</Text>
                        </Button>
                    </Link>
                )}

                <FlatList
                    data={data?.res}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center py-2">
                            {/* <Image source={{ uri: item?.image }} className="w-10 h-10 mr-2" /> */}
                            <Text>{item?.name}</Text>
                        </View>
                    )}
                />
            </View>

            <Footer>
                <Link
                    href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/review`}
                    asChild
                    disabled={!data || data?.res.length === 0}
                >
                    <Button>
                        <Text>Confirm components</Text>
                    </Button>
                </Link>
            </Footer>
        </View>
    )
}
