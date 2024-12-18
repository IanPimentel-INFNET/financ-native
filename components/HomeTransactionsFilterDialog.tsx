import { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Icon, IconButton, Portal, Text, ToggleButton } from 'react-native-paper';
import { filterOptions } from '../app/(tabs)/index'
import { AmountFilter, DateFilter, PriceFilter, TotalPriceFilter } from './TransactionsFilterButtons';
type Props = {
    setFilters: React.Dispatch<React.SetStateAction<filterOptions>>
    filters: filterOptions
}

const HomeTransactionsFilterDialog = ({ filters, setFilters }: Props) => {
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    // console.log(filters)

    return (
        <View>
            <Button onPress={showDialog} mode='outlined'>Filtrar</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Filtros</Dialog.Title>
                    <Dialog.Content>
                        <View className='gap-y-2'>
                            <Button
                                icon={filters.order === 'ASC' ? 'chevron-down' : 'chevron-up'}
                                mode={'outlined'}
                                onPress={() => setFilters((prev) => {
                                    return { ...prev, order: filters.order === 'ASC' ? 'DESC' : 'ASC' }
                                })}
                            >
                                Ordenação
                            </Button>
                            <View className='flex-row gap-x-2'>

                                <TotalPriceFilter filters={filters} setFilters={setFilters} />
                                <AmountFilter filters={filters} setFilters={setFilters} />
                                <DateFilter filters={filters} setFilters={setFilters} />
                                <PriceFilter filters={filters} setFilters={setFilters} />

                            </View>


                        </View>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Feito</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default HomeTransactionsFilterDialog;