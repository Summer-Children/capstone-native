import { Text } from '@/reusables/components/ui/text'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'
import { GET_BUILDINGS_ON_FIRST_LOAD } from '@/src/entities/building/hook'
import { ArrowIcon } from '@/src/shared/ui'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { useMutation, useQuery } from '@apollo/client'
import { ComboBox } from '@shared/ui/combo-box'
import { router } from 'expo-router'
import { type ReactNode, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

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
                pathname: '/buildings/new',
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
                    draft: true
                }
            },
            onCompleted: data => {
                router.push({
                    pathname: '/buildings/[buildingId]/assessments/[assessmentReportId]/components',
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
                label="building name"
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
            {isNewBldg && buildingLabel !== null && (
                <TouchableOpacity
                    className="flex-row items-center justify-between"
                    onPress={() => {
                        router.push({
                            pathname: '../building/create',
                            params: {
                                buildingLabel
                            }
                        })
                    }}
                >
                    <Text className="text-md text-eva-black-900 py-5 px-4">Not found. Create this building</Text>
                    <ArrowIcon direction="outward" color="#1c1d1f" />
                </TouchableOpacity>
            )}

            <Footer>
                <BottomButton
                    onPress={handleRouter}
                    disabled={!buildingLabel || buildingLabel === '' || buildingLabel === null || isNewBldg}
                >
                    Continue
                </BottomButton>
            </Footer>
        </View>
    )
}
