import { Text } from '@/reusables/components/ui/text'
import {
    CREATE_ASSESSMENT_REPORT,
    GET_ASSESSMENT_REPORTS_BY_BUILDINGID
} from '@/src/entities/assessment-report/hook/assessment-report'
import { GET_BUILDINGS_ON_FIRST_LOAD } from '@/src/entities/building/hook'
import { ArrowIcon, LocationIcon } from '@/src/shared/ui'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { ComboBox } from '@shared/ui/combo-box'
import { router } from 'expo-router'
import { type ReactNode, useMemo, useState } from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'

type AssessmentReport = {
    id: string
    fiscalYear: number
}

export default function SelectBuildingPage(): ReactNode {
    const [buildingLabel, setBuildingLabel] = useState<string | null>(null)
    const [buildingInput, setBuildingInput] = useState<{ id: string; val: string; fiscalYear: number } | null>(null)

    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const { data, loading, error } = useQuery(GET_BUILDINGS_ON_FIRST_LOAD, {
        fetchPolicy: 'network-only'
    })
    const concatAddress = (name: string, address: string): string => `${address} - ${name}`
    const buildingsWithAddress = data?.res.map(building => concatAddress(building?.name ?? '', building?.address ?? ''))
    const isNewBldg = useMemo(() => {
        return !(
            buildingLabel &&
            buildingsWithAddress?.some(building => building?.toLowerCase().includes(buildingLabel.toLowerCase()))
        )
    }, [buildingLabel, buildingsWithAddress])

    const [getAssessmentReports] = useLazyQuery(GET_ASSESSMENT_REPORTS_BY_BUILDINGID)
    const [createAssessmentReport] = useMutation(CREATE_ASSESSMENT_REPORT)

    // only for existing building
    const handleRouter = async (): Promise<void> => {
        if (!buildingInput) {
            // TOFIX:
            console.error('Building input is null')
            return
        }

        // Check if there is already an assessment report for the selected building and for the same fiscal year. If there is one, use that existing assessment report. If not, create a new one.
        const { data: assessmentReportsData } = await getAssessmentReports({
            variables: { buildingId: buildingInput.id }
        })

        const existingAssessmentReport = assessmentReportsData?.res?.find(
            (assessmentReport): assessmentReport is AssessmentReport =>
                assessmentReport !== null && assessmentReport.fiscalYear === buildingInput?.fiscalYear
        )

        if (existingAssessmentReport) {
            router.push({
                pathname: '/buildings/[buildingId]/assessments/[assessmentReportId]/components',
                params: {
                    buildingId: buildingInput?.id,
                    assessmentReportId: existingAssessmentReport.id
                }
            })
            return
        }

        await createAssessmentReport({
            variables: {
                input: {
                    buildingId: buildingInput.id,
                    draft: true
                }
            },
            refetchQueries: [
                {
                    query: GET_ASSESSMENT_REPORTS_BY_BUILDINGID,
                    variables: { buildingId: buildingInput.id }
                }
            ],
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <Header headerText="First select your building" />
                    <ComboBox
                        label="Building name"
                        placeholder="Search for a building"
                        options={
                            data.res.map(building => ({
                                id: building?.id ?? '',
                                val: concatAddress(building?.name ?? '', building?.address ?? ''),
                                fiscalYear: building?.fiscalYear ?? 0
                            })) ?? []
                        }
                        value={buildingLabel ?? ''}
                        onChangeText={text => {
                            setBuildingLabel(text)
                        }}
                        onSelect={item => {
                            setBuildingInput({
                                ...item,
                                fiscalYear: item.fiscalYear ?? 0
                            })
                            setBuildingLabel(item.val)
                            setDropdownVisible(false)
                            Keyboard.dismiss()
                        }}
                        isDropdownVisible={isDropdownVisible}
                        setDropdownVisible={setDropdownVisible}
                        prefixIcon={<LocationIcon width={20} height={20} />}
                    />
                    {isNewBldg && !!buildingLabel && (
                        <TouchableOpacity
                            className="flex-row items-center justify-between"
                            onPress={() => {
                                router.push({
                                    pathname: '../buildings/new',
                                    params: {
                                        buildingLabel
                                    }
                                })
                            }}
                        >
                            <Text className="text-md text-eva-black-900 py-5 px-4">
                                Not found. Create this building
                            </Text>
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
