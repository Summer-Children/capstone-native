import React, { ReactNode } from 'react'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { PendingCard } from '@/src/entities/building/ui/pending-card'
import { Building } from '@/src/entities/building/type/building-type'

interface BuildingCarouselProps {
    buildings: Building[]
    selectedBuilding: string | null
    onSelectBuilding: (id: string) => void
}

export function BuildingCarousel({ buildings, selectedBuilding, onSelectBuilding }: BuildingCarouselProps): ReactNode {
    const sliderWidth = Dimensions.get('window').width
    return (
        <Carousel
            width={sliderWidth}
            height={130}
            data={buildings.slice(0, 5)}
            loop={false}
            snapEnabled
            pagingEnabled
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50
            }}
            renderItem={({ item }) => (
                <PendingCard
                    building={item}
                    onPress={() => onSelectBuilding(item.id)}
                    isSelected={selectedBuilding === item.id}
                />
            )}
            scrollAnimationDuration={500}
            onSnapToItem={index => onSelectBuilding(buildings[index].id)}
        />
    )
}
