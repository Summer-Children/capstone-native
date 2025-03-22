import React, { ReactNode, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { BuildingCard } from '@/src/entities/building/ui/building-card'
import { Building } from '@/src/entities/building/type/building-type'

interface BuildingCarouselProps {
    buildings: Building[]
    selectedBuilding: string | null
    onSelectBuilding: (id: string) => void
    onCardPress: (id: string) => void
}

export function BuildingCarousel({
    buildings,
    selectedBuilding,
    onSelectBuilding,
    onCardPress
}: BuildingCarouselProps): ReactNode {
    const sliderWidth = Dimensions.get('window').width
    const carouselRef = useRef<ICarouselInstance>(null)

    useEffect(() => {
        if (selectedBuilding && carouselRef.current) {
            const index = buildings.findIndex(b => b.id === selectedBuilding)
            if (index !== -1) {
                carouselRef.current?.scrollTo({ index, animated: true })
            }
        }
    }, [selectedBuilding])

    return (
        <Carousel
            ref={carouselRef}
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
                <BuildingCard
                    building={item}
                    onPress={() => {
                        onSelectBuilding(item.id)
                        onCardPress(item.id)
                    }}
                    hasShadow={true}
                />
            )}
            scrollAnimationDuration={500}
            onSnapToItem={index => {
                const selectedId = buildings[index]?.id
                if (selectedId) {
                    onSelectBuilding(selectedId)
                }
            }}
        />
    )
}
