import { type ReactNode, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { router } from 'expo-router'
import { ComboBox } from '@shared/ui/combo-box'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'
import { GET_BUILDINGS_ON_FIRST_LOAD } from '@/src/entities/building/hook'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'

export default function SelectBuildingPage(): ReactNode {
    const [buildingLabel, setBuildingLabel] = useState<string | null>(null)
    const [buildingInput, setBuildingInput] = useState<{ id: string; val: string } | null>(null)

    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const { data, loading, error } = useQuery(GET_BUILDINGS_ON_FIRST_LOAD, {
        fetchPolicy: 'network-only'
    })
    const isNewBldg = useMemo(() => {
        return !(
            buildingLabel && data?.res.some(building => building?.name?.toLowerCase() === buildingLabel.toLowerCase())
        )
    }, [buildingLabel, data])

    const [createAssessmentReport] = useMutation(CREATE_ASSESSMENT_REPORT)

    const handleRouter = async (): Promise<void> => {
        // for new building
        if (isNewBldg) {
            router.push({
                pathname: '../building/create',
                params: {
                    buildingLabel
                }
            })
            return
        }

        if (!buildingInput) {
            // TOFIX:
            console.error('Building input is null')
            return
        }

        // for existing building
        await createAssessmentReport({
            variables: {
                input: {
                    buildingId: buildingInput.id,
                    fiscalYear: 0, // TOFIX: something wrong with backend because it can be null
                    draft: true
                }
            },
            onCompleted: data => {
                router.push({
                    pathname: './buildings/[buildingId]/assessments/[assessmentReportId]/components',
                    params: {
                        buildingId: buildingInput?.id,
                        assessmentReportId: data?.createAssessmentReport.id
                    }
                })
            }
        })
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
            <ComboBox
                placeholder="Search for a building"
                options={data.res.map(building => ({ id: building?.id ?? '', val: building?.name ?? '' })) ?? []}
                value={buildingLabel ?? ''}
                onChangeText={text => {
                    setBuildingLabel(text)
                }}
                onSelect={item => {
                    setBuildingInput(item)
                    setBuildingLabel(item.val)
                    setDropdownVisible(false)
                }}
                isDropdownVisible={isDropdownVisible}
                setDropdownVisible={setDropdownVisible}
            />

            <Footer>
                {isNewBldg && buildingLabel !== null && (
                    <Text className="text-red-500 text-sm mb-2">Not found. Create this building</Text>
                )}
                <Button
                    variant="default"
                    onPress={handleRouter}
                    disabled={!buildingLabel || buildingLabel === '' || buildingLabel === null}
                >
                    <Text>Continue</Text>
                </Button>
            </Footer>
        </View>
    )
}
