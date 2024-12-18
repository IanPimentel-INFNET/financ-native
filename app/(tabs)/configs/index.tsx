import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

import { filterOptions, sortTransactions, transactionInfoType } from '../home/index';

import Container from '~/components/Container';
import HomeTransactionsFilterDialog from '~/components/HomeTransactionsFilterDialog';
import {
    AmountFilter,
    DateFilter,
    PriceFilter,
    TotalPriceFilter,
} from '~/components/TransactionsFilterButtons';

const DATA: transactionInfoType[] = [
    {
        id: 1,
        type: 'BUY',
        amount: 1,
        price: 203.15,
        total: 203.15,
        symbol: 'AAPL',
        date: new Date(),
    },
    {
        id: 0,
        type: 'BUY',
        amount: 4,
        price: 203.1,
        total: 812.4,
        symbol: 'AAPL',
        date: new Date(),
    },
    {
        id: 3,
        type: 'BUY',
        amount: 2,
        price: 203.15,
        total: 406.3,
        symbol: 'AAPL',
        date: new Date(),
    },
];
const TOTAL = DATA.reduce((sum, t) => sum + t.total, 0);
function calcularPorcentagem(valor: number) {
    if (!valor) return '0%';
    return Math.floor((valor / TOTAL) * 100) + '%';
}

const Index = () => {
    const [filters, setFilters] = useState<filterOptions>({ order: 'DESC', type: 'BUY', fields: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(DATA);

    useEffect(() => {
        setFilteredData(sortTransactions({ data: DATA, filterOpts: filters }));
    }, [filters]);

    return (
        <>
            <Container>
                <View className="gap-y-2 p-2">
                    <View className="flex-row items-center gap-x-4">
                        <View className="flex-grow">
                            <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
                        </View>
                        <HomeTransactionsFilterDialog filters={filters} setFilters={setFilters} />
                    </View>
                    <View className="flex-row gap-x-2">
                        {filters.fields.includes('total') && (
                            <TotalPriceFilter filters={filters} setFilters={setFilters} />
                        )}
                        {filters.fields.includes('amount') && (
                            <AmountFilter filters={filters} setFilters={setFilters} />
                        )}
                        {filters.fields.includes('date') && (
                            <DateFilter filters={filters} setFilters={setFilters} />
                        )}
                        {filters.fields.includes('price') && (
                            <PriceFilter filters={filters} setFilters={setFilters} />
                        )}
                    </View>
                </View>
                <FlatList
                    data={filteredData.filter((item) => {
                        return (
                            searchQuery === '' || item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    })}
                    renderItem={(item) => {
                        return (
                            <View className="p-2">
                                <View>
                                    <Text variant="titleLarge" style={{ fontWeight: '700' }}>
                                        {item.item.symbol}
                                    </Text>

                                    <Text variant="titleMedium" style={{ fontWeight: '700' }}>
                                        $ {item.item.total}
                                    </Text>
                                </View>
                                <View className="mt-1 flex-row justify-between">
                                    <Text variant="titleSmall">
                                        {item.item.price} x {item.item.amount}
                                    </Text>
                                    <Text variant="titleSmall">{calcularPorcentagem(item.item.total)}</Text>
                                    <Text variant="titleSmall">{item.item.date.toLocaleDateString()}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
                <View>
                    <Text>Total: {TOTAL}</Text>
                </View>
            </Container>
        </>
    );
};

export default Index;
