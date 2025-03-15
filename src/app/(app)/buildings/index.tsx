import { type ReactNode, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { Link, router } from 'expo-router'
import { ComboBox } from '@shared/ui/combo-box'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'
import { GET_BUILDINGS } from '@/src/entities/building/hook'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'

export default function SelectBuildingPage(): ReactNode {
    const [buildingLabel, setBuildingLabel] = useState<string | null>(null)
    const [buildingInput, setBuildingInput] = useState<{ id: string; name: string } | null>(null)

    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const { data, loading, error } = useQuery(GET_BUILDINGS)
    const isRegisteredBuilding =
        buildingLabel &&
        data &&
        data?.res.some(building => building?.name?.toLowerCase() === buildingLabel.toLowerCase())

    const [createAssessmentReport] = useMutation(CREATE_ASSESSMENT_REPORT)

    const handleRouter = async (): Promise<void> => {
        const buildingId = buildingInput?.id
        if (isRegisteredBuilding && buildingId) {
            await createAssessmentReport({
                variables: {
                    input: {
                        buildingId: buildingId,
                        fiscalYear: 0, // TOFIX: something wrong with backend because it can be null
                        draft: true
                    }
                },
                onCompleted: data => {
                    router.push({
                        pathname: './buildings/[buildingId]/assessments/[assessmentReportId]/components',
                        params: { buildingId: buildingInput?.id, assessmentReportId: data?.createAssessmentReport.id }
                    })
                }
            })
        }
    }

    if (error) {
        throw error
    }

    if (loading || !data) {
        return <Text>Loading...</Text>
    }

    return (
        <View className="flex-1">
            <Header headerText="First select your building" />
            <Text>
                Building label: {buildingLabel} {buildingInput?.id}
            </Text>
            <ComboBox
                placeholder="Search for a building"
                options={data.res.map(building => ({ id: building?.id ?? '', name: building?.name ?? '' })) ?? []}
                value={buildingLabel ?? ''}
                onChangeText={text => {
                    setBuildingLabel(text.trim())
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
                    <Button variant="default" onPress={handleRouter}>
                        <Text>Continue</Text>
                    </Button>
                ) : buildingLabel && !isDropdownVisible ? (
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
