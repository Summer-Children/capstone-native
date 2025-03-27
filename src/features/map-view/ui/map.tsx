import React, { useEffect, useRef, ReactNode, useState, useMemo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Circle, Region } from 'react-native-maps'
import { MapMarker } from '@shared/ui/map-marker'
import { NearMeIcon } from '@/src/shared/ui'
import * as Location from 'expo-location'
import { BlurView } from 'expo-blur'
import { getBuildingState } from '@/src/entities/building/ui/building-card'
import { Building } from '@/src/entities/building/type/building-type'

interface MapViewComponentProps {
    buildings: Building[]
    selectedBuilding: string | null
    onSelectBuilding: (id: string) => void
}

// Default location: Langara college
const DEFAULT_COORDS = {
    latitude: 49.224972,
    longitude: -123.10758
}

export function MapViewComponent({ buildings, selectedBuilding, onSelectBuilding }: MapViewComponentProps): ReactNode {
    const [coordinates, setCoordinates] = useState<{ [key: string]: { latitude: number; longitude: number } }>({})
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
    const [, setErrorMsg] = useState<string | null>(null)
    const [isLocating, setIsLocating] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const mapRef = useRef<MapView | null>(null)

    const requestLocationPermission = async (): Promise<boolean> => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync()
            if (!granted) {
                setErrorMsg('Permission to access location was denied')
                return false
            }
            return true
        } catch (error) {
            console.error('Error requesting location permission:', error)
            return false
        }
    }

    const getUserLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
        if (!(await requestLocationPermission())) return null

        try {
            const location = await Location.getCurrentPositionAsync({})
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        } catch (error) {
            console.error('Error getting user location:', error)
            return null
        }
    }

    useEffect(() => {
        const fetchCoordinates = async (): Promise<void> => {
            try {
                const coordsMap: { [key: string]: { latitude: number; longitude: number } } = {}
                await Promise.all(
                    buildings.map(async building => {
                        const geocode = await Location.geocodeAsync(building.address)
                        if (geocode.length > 0) {
                            coordsMap[building.id] = {
                                latitude: geocode[0].latitude,
                                longitude: geocode[0].longitude
                            }
                        }
                    })
                )
                setCoordinates(coordsMap)
                setIsLoaded(true)
            } catch (error) {
                console.error('Error fetching coordinates:', error)
            }
        }
        void fetchCoordinates()
    }, [buildings])

    useEffect(() => {
        const initUserLocation = async (): Promise<void> => {
            const location = await getUserLocation()
            setUserLocation(location)
        }

        void initUserLocation()
    }, [])

    useEffect(() => {
        const noBuildingHasCoords = !buildings.some(b => coordinates[b.id])
        if (userLocation && noBuildingHasCoords) {
            mapRef.current?.animateToRegion(
                {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                },
                350
            )
        }
    }, [userLocation, coordinates, buildings])

    useEffect(() => {
        if (selectedBuilding && coordinates[selectedBuilding]) {
            requestAnimationFrame(() => {
                mapRef.current?.animateToRegion({
                    latitude: coordinates[selectedBuilding].latitude,
                    longitude: coordinates[selectedBuilding].longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                })
            })
        }
    }, [selectedBuilding, coordinates, isLoaded])

    const locateUser = async (): Promise<void> => {
        setIsLocating(true)
        try {
            const location = await getUserLocation()
            if (!location) return

            setUserLocation(location)

            mapRef.current?.animateToRegion(
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                },
                350
            )
        } finally {
            setTimeout(() => setIsLocating(false), 1500)
        }
    }

    const initialRegion = useMemo<Region>(() => {
        const firstBuildingWithCoords = buildings.find(b => coordinates[b.id])
        const center = firstBuildingWithCoords
            ? coordinates[firstBuildingWithCoords.id]
            : userLocation
              ? userLocation
              : DEFAULT_COORDS

        return {
            ...center,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        }
    }, [coordinates, buildings, userLocation])

    return (
        <View className="flex-1 mb-10 rounded-2xl overflow-hidden">
            <MapView ref={mapRef} style={StyleSheet.absoluteFillObject} initialRegion={initialRegion}>
                {isLoaded &&
                    buildings.map(building => {
                        const coords = coordinates[building.id]
                        if (!coords) return null
                        const state = getBuildingState(building)
                        const markerColor =
                            state === 'pending' ? '#DC2626' : state === 'in progress' ? '#FB954B' : '#348352'

                        return (
                            <MapMarker
                                key={building.id}
                                building={building}
                                coordinate={coords}
                                color={markerColor}
                                onPress={() => onSelectBuilding(building.id)}
                                isSelected={building.id === selectedBuilding}
                            />
                        )
                    })}
                {userLocation && (
                    <Circle center={userLocation} radius={16} strokeColor="white" fillColor="#007AFF" strokeWidth={2} />
                )}
            </MapView>
            <View className="absolute top-0 left-0 right-0">
                <BlurView intensity={5} tint="light">
                    <View className="flex-row justify-end mt-2 pr-2">
                        <TouchableOpacity
                            className="w-8 h-8 rounded-full justify-center items-center bg-[#F1F1F1] opacity-70 border border-eva-white-100"
                            onPress={locateUser}
                        >
                            <NearMeIcon
                                size={16}
                                variant={isLocating ? 'solid' : 'outline'}
                                color={isLocating ? '#0251FF' : '#000'}
                            />
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </View>
    )
}
