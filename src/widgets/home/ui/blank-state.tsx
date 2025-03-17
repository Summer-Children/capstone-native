import { AddHomeIcon, AssignmentIcon, BuildingsIcon } from '@/src/shared/ui'
import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { ActionButton } from './action-button'

interface BlankStateProps {
    onBuildingPress: () => void
    onAssessmentPress: () => void
}

export function BlankState({ onBuildingPress, onAssessmentPress }: BlankStateProps): ReactNode {
    return (
        <View className="flex-1 items-center justify-center m-4 rounded-2xl p-8 gap-4 bg-[#F9F9F9]">
            <BuildingsIcon size={85} color="#EAEBED" />
            <Text className="text-2xl font-bold text-center">No assessments yet</Text>
            <Text className="text-center mb-8">
                Add a building to get started or begin an assessment for an existing one.
            </Text>

            <ActionButton
                label="New Assessment"
                icon={<AssignmentIcon variant="solid" color="#1C1D1F" size={16} />}
                onPress={onAssessmentPress}
            />
            <ActionButton
                label="Add Building"
                icon={<AddHomeIcon variant="solid" color="#1C1D1F" size={16} />}
                onPress={onBuildingPress}
            />
        </View>
    )
}
