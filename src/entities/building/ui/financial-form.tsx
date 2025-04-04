import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { CustomInput } from '@/src/shared/ui/text-input'
import { ReactNode, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

export function FinancialForm(): ReactNode {
    const { watch, setValue } = useFormContext()
    const [showPicker, setShowPicker] = useState(false)
    const [inputYear, setInputYear] = useState(watch('fiscalYear')?.toString() || '')
    const [pickerSelectedYear, setPickerSelectedYear] = useState(inputYear)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => (2000 + i).toString())

    const handleYearChange = (text: string): void => {
        setInputYear(text)

        if (/^\d{4}$/.test(text)) {
            const selectedYear = Math.min(Math.max(parseInt(text, 10), 2000), 2025)

            setValue('fiscalYear', selectedYear)
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

    const handleNumericInputChange = (text: string, setter: (value: string) => void): void => {
        if (text === '') {
            setter('')
        } else {
            const cleaned = text.replace(/[^0-9.]/g, '')
            const normalized = cleaned.split('.').reduce((acc, part, i) => {
                return i === 0 ? part : acc + '.' + part
            }, '')
            setter(normalized)
        }
    }

    const formatNumberWithCommas = (value?: string | number): string => {
        if (!value && value !== 0) return ''
        const str = typeof value === 'number' ? value.toString() : value
        const parts = str.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return parts.join('.')
    }

    return (
        <View className="flex flex-col gap-4">
            <CustomInput
                label="Fiscal year *"
                value={inputYear}
                onChangeText={handleYearChange}
                onFocus={() => {
                    setShowPicker(true)
                }}
                clearable
            />
            {showPicker && (
                <Picker
                    selectedValue={pickerSelectedYear}
                    onValueChange={itemValue => {
                        setValue('fiscalYear', Number(itemValue))
                        setInputYear(itemValue.toString())
                        setShowPicker(false)
                    }}
                    itemStyle={{ fontSize: 14, height: 160 }}
                >
                    {years.map(year => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))}
                </Picker>
            )}

            <CustomInput
                label="CRF Annual Contribution *"
                value={formatNumberWithCommas(watch('crfAnnualContribution'))}
                onChangeText={text => handleNumericInputChange(text, val => setValue('crfAnnualContribution', val))}
                clearable
            />

            <CustomInput
                label="Total CRF Balance *"
                value={formatNumberWithCommas(watch('crfTotalBalance'))}
                onChangeText={text => handleNumericInputChange(text, val => setValue('crfTotalBalance', val))}
                clearable
            />

            <CustomInput
                label="CRF Minimum Balance *"
                value={formatNumberWithCommas(watch('crfMinimumBalance'))}
                onChangeText={text => handleNumericInputChange(text, val => setValue('crfMinimumBalance', val))}
                clearable
            />
        </View>
    )
}
