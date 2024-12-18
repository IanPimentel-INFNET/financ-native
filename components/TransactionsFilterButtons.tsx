import { Button, Icon } from "react-native-paper"
import { filterOptions } from "~/app/(tabs)"

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<filterOptions>>
    filters: filterOptions
}

export function TotalPriceFilter({ filters, setFilters }: Props) {
    return (
        <Button
            icon={() => {
                if (!filters.fields.includes('total')) {
                    return (
                        <Icon
                            source="cash"
                            size={20}
                        />
                    )
                }
                return filters.order === 'ASC' ? (
                    <Icon
                        source='cash-minus'
                        size={20}
                    />

                ) : (
                    <Icon
                        source='cash-plus'
                        size={20}
                    />

                )
            }}
            mode={!filters.fields.includes('total') ? 'outlined' : 'contained-tonal'}
            onPress={() => {
                if (filters.fields.includes('total')) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            fields: [
                                ...prev.fields.filter(f => { return f !== 'total' })
                            ]
                        }
                    })
                    return
                }
                setFilters(prev => {
                    return {
                        ...prev,
                        fields: [
                            ...prev.fields,
                            'total'
                        ]
                    }
                })
            }}
        >
            {
                !filters.fields.includes('total') ? (
                    'Ordenar por preço total?'
                ) : (
                    'Ordenando por preço total.'
                )
            }
        </Button>
    )
}

export function AmountFilter({ filters, setFilters }: Props) {
    return (
        <Button
            icon={() => {
                if (!filters.fields.includes('amount')) {
                    return (
                        <Icon
                            source="numeric"
                            size={20}
                        />
                    )
                }
                return filters.order === 'ASC' ? (
                    <Icon
                        source='sort-numeric-ascending'
                        size={20}
                    />

                ) : (
                    <Icon
                        source='sort-numeric-descending'
                        size={20}
                    />

                )
            }}
            mode={!filters.fields.includes('amount') ? 'outlined' : 'contained-tonal'}
            onPress={() => {
                if (filters.fields.includes('amount')) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            fields: [
                                ...prev.fields.filter(f => { return f !== 'amount' })
                            ]
                        }
                    })
                    return
                }
                setFilters(prev => {
                    return {
                        ...prev,
                        fields: [
                            ...prev.fields,
                            'amount'
                        ]
                    }
                })
            }}
        >
            {
                !filters.fields.includes('amount') ? (
                    'Ordenar por quantidade?'
                ) : (
                    'Ordenando por quantidade.'
                )
            }
        </Button>
    )
}

export function DateFilter({ filters, setFilters }: Props) {
    return (
        <Button
            icon={() => {
                if (!filters.fields.includes('date')) {
                    return (
                        <Icon
                            source="calendar-blank"
                            size={20}
                        />
                    )
                }
                return filters.order === 'ASC' ? (
                    <Icon
                        source='sort-calendar-ascending'
                        size={20}
                    />

                ) : (
                    <Icon
                        source='sort-calendar-descending'
                        size={20}
                    />

                )
            }}
            mode={!filters.fields.includes('date') ? 'outlined' : 'contained-tonal'}
            onPress={() => {
                if (filters.fields.includes('date')) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            fields: [
                                ...prev.fields.filter(f => { return f !== 'date' })
                            ]
                        }
                    })
                    return
                }
                setFilters(prev => {
                    return {
                        ...prev,
                        fields: [
                            ...prev.fields,
                            'date'
                        ]
                    }
                })
            }}
        >
            {
                !filters.fields.includes('date') ? (
                    'Ordenar por data?'
                ) : (
                    'Ordenando por data.'
                )
            }
        </Button>
    )
}

export function PriceFilter({ filters, setFilters }: Props) {
    return (
        <Button
            icon={() => {
                if (!filters.fields.includes('price')) {
                    return (
                        <Icon
                            source="cash"
                            size={20}
                        />
                    )
                }
                return filters.order === 'ASC' ? (
                    <Icon
                        source='cash-plus'
                        size={20}
                    />

                ) : (
                    <Icon
                        source='cash-minus'
                        size={20}
                    />

                )
            }}
            mode={!filters.fields.includes('price') ? 'outlined' : 'contained-tonal'}
            onPress={() => {
                if (filters.fields.includes('price')) {
                    setFilters(prev => {
                        return {
                            ...prev,
                            fields: [
                                ...prev.fields.filter(f => { return f !== 'price' })
                            ]
                        }
                    })
                    return
                }
                setFilters(prev => {
                    return {
                        ...prev,
                        fields: [
                            ...prev.fields,
                            'price'
                        ]
                    }
                })
            }}
        >
            {
                !filters.fields.includes('price') ? (
                    'Ordenar por preço?'
                ) : (
                    'Ordenando por preço.'
                )
            }
        </Button>
    )
}