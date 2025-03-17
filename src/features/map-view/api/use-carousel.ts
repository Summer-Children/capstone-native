import { useState } from 'react'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

interface UseCarouselResult {
    handleSelectBuilding: (id: string) => void
    selectedBuilding: string | null
    sliderWidth: number
    itemWidth: number
}

export function useCarousel(): UseCarouselResult {
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
    const handleSelectBuilding = (id: string): void => {
        setSelectedBuilding(id)
    }

    return {
        handleSelectBuilding,
        selectedBuilding,
        sliderWidth: SCREEN_WIDTH,
        itemWidth: SCREEN_WIDTH * 0.8
    }
}
