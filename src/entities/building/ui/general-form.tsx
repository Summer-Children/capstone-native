import { View, Image, TouchableOpacity } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { CustomInput } from '@/src/shared/ui/text-input'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ReactNode, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import * as Location from 'expo-location'
import { AddPhotoIcon, CameraIcon, LocationIcon } from '@/src/shared/ui'
import { ActionButton } from '@/src/widgets/home'
import { getBuildingImageUrl } from '../hook/getBuildingImageUrl'

interface GeneralFormProps {
    mode: 'edit' | 'create'
    buildingId?: string
}

export function GeneralForm({ mode, buildingId }: GeneralFormProps): ReactNode {
    const { watch, setValue } = useFormContext()
    const router = useRouter()
    const { coverImage: newCoverImage } = useLocalSearchParams()
    const [showPicker, setShowPicker] = useState(false)
    const [inputYear, setInputYear] = useState(watch('year')?.toString() || '')
    const [pickerSelectedYear, setPickerSelectedYear] = useState(inputYear)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => (1900 + i).toString())

    useEffect(() => {
        if (mode === 'edit' && buildingId) {
            setValue('coverImage', getBuildingImageUrl(buildingId))
        }
    }, [mode, buildingId, setValue])

    useEffect(() => {
        if (newCoverImage && typeof newCoverImage === 'string') {
            setValue('coverImage', newCoverImage)
        }
    }, [newCoverImage, setValue])

    const fetchCurrentLocation = async (): Promise<void> => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation
            })

            const { latitude, longitude } = location.coords
            const response = await Location.reverseGeocodeAsync({ latitude, longitude })

            if (response.length > 0) {
                // NOTE from Natsuko: I added the type assertion to prevent lint error.
                // const { name, city, postalCode, region, country } = response[0]
                const { name, city, postalCode, region, country } = response[0] as {
                    name: string | null
                    city: string | null
                    postalCode: string | null
                    region: string | null
                    country: string | null
                }
                const formattedAddress = `${name ? name + ', ' : ''}${city ? city + ', ' : ''}${region ? region + ', ' : ''}${country ? country + ', ' : ''}${postalCode || ''}`
                setValue('address', formattedAddress)
            } else {
                alert('Failed to get address')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleYearChange = (text: string): void => {
        setInputYear(text)

        if (/^\d{4}$/.test(text)) {
            const selectedYear = Math.min(Math.max(parseInt(text, 10), 1900), 2025)

            setValue('year', selectedYear)
            setPickerSelectedYear(selectedYear.toString())
            setInputYear(selectedYear.toString())
            setShowPicker(false)
        } else {
            const matchingYear = years.find(y => y.startsWith(text))
            if (matchingYear) {
                setPickerSelectedYear(matchingYear)
            }
            setShowPicker(true)
        }
    }

    return (
        <View className="flex-1 flex-col gap-4">
            <View className="h-36 rounded-xl bg-white items-center justify-center border border-eva-white-500 border-dashed">
                {watch('coverImage') ? (
                    <>
                        <Image
                            source={{ uri: watch('coverImage') }}
                            className="w-full h-full rounded-xl overflow-hidden"
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            className="absolute top-2 right-6"
                            onPress={() =>
                                router.push(
                                    mode === 'edit'
                                        ? `/buildings/add-photo?source=edit&buildingId=${buildingId}`
                                        : `/buildings/add-photo?source=create`
                                )
                            }
                        >
                            <AddPhotoIcon />
                        </TouchableOpacity>
                    </>
                ) : (
                    <ActionButton
                        label="Add a picture of a building"
                        icon={<CameraIcon size={20} variant="solid" color="#1C1D1F" />}
                        onPress={() =>
                            router.push(
                                mode === 'edit'
                                    ? `/buildings/add-photo?source=edit&buildingId=${buildingId}`
                                    : `/buildings/add-photo?source=create`
                            )
                        }
                    />
                )}
            </View>

            <CustomInput
                label="Building name *"
                value={watch('name')}
                onChangeText={text => setValue('name', text)}
                clearable
            />

            <CustomInput
                label="Location *"
                value={watch('address')}
                onChangeText={text => setValue('address', text)}
                suffix={
                    <TouchableOpacity onPress={fetchCurrentLocation}>
                        <LocationIcon size={20} />
                    </TouchableOpacity>
                }
            />

            <CustomInput
                label="Construction year *"
                value={inputYear}
                onChangeText={handleYearChange}
                onFocus={() => setShowPicker(true)}
                clearable
            />
            {showPicker && (
                <Picker
                    selectedValue={pickerSelectedYear}
                    onValueChange={itemValue => {
                        setValue('year', Number(itemValue))
                        setInputYear(itemValue.toString())
                        setShowPicker(false)
                    }}
                    itemStyle={{ fontSize: 16, height: 180 }}
                >
                    {years.map(year => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))}
                </Picker>
            )}

            <CustomInput
                label="Strata number *"
                value={watch('strataId')}
                onChangeText={text => setValue('strataId', text)}
                clearable
            />
        </View>
    )
}
