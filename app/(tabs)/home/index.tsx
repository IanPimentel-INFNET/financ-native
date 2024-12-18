import Container from "~/components/Container"
import { View } from 'react-native'
import { Searchbar} from 'react-native-paper'
import { useEffect, useState } from "react";
import HomeTransactionsFilterDialog from "~/components/HomeTransactionsFilterDialog";
import TransactionsSectionList from "~/components/TransactionsSectionList";
import { AmountFilter, DateFilter, PriceFilter, TotalPriceFilter } from '~/components/TransactionsFilterButtons';
import { sort } from "fast-sort";

export type filterFieldsTypes = keyof transactionInfoType
// | 'id'
// | 'type'
// | 'total'
// | 'amount'
// | 'price'
// | 'symbol'
// | 'date'

type transactionType =
    | 'BUY'
    | 'SELL'

export type transactionInfoType = {
    id: number,
    type: transactionType,
    amount: number,
    price: number,
    total: number,
    symbol: string,
    date: Date
}

export type transactionSectionListType = {
    title: transactionType,
    data: { [key: string]: transactionInfoType[] }[]
}[]

const DATA: transactionSectionListType = [
    {
        title: "BUY",
        data: [
            {
                'APPL': [
                    {
                        id: 1,
                        type: 'BUY',
                        amount: 1,
                        price: 203.15,
                        total: 203.15,
                        symbol: 'AAPL',
                        date: new Date()
                    },
                    {
                        id: 0,
                        type: 'BUY',
                        amount: 4,
                        price: 203.10,
                        total: 812.4,
                        symbol: 'AAPL',
                        date: new Date()
                    },
                    {
                        id: 3,
                        type: 'BUY',
                        amount: 2,
                        price: 203.15,
                        total: 406.30,
                        symbol: 'AAPL',
                        date: new Date()
                    },

                ]
            },
        ]
    },
    {
        title: "SELL",
        data: [{
            'APPL': [
                {
                    id: 2,
                    type: 'SELL',
                    amount: 6,
                    price: 203.15,
                    total: 1218.90,
                    symbol: 'AAPL',
                    date: new Date()
                },
                {
                    id: 5,
                    type: 'SELL',
                    amount: 7,
                    price: 100,
                    total: 700,
                    symbol: 'AAPL',
                    date: new Date()
                },
            ]
        }]
    }
]

export type filterOptions = {
    order: 'ASC' | 'DESC',
    type: transactionType | 'NONE',
    fields: filterFieldsTypes[]
}

function getFieldsFilters({ fTypes = [] }: {
    fTypes: filterFieldsTypes[]
}) {
    return fTypes.map((f) => {
        return (u: transactionInfoType) => u[f]
    })
}

export function sortTransactions({ data, filterOpts }: { data: transactionInfoType[], filterOpts: filterOptions }) {
    let filter = sort(data)
    if (!filterOpts.fields.length) {
        return filterOpts.order === 'ASC' ? filter.asc(u => u.total) : filter.desc(u => u.total)
    }
    return filterOpts.order === 'ASC' ?
        filter.asc(getFieldsFilters({ fTypes: filterOpts.fields })) :
        filter.desc(getFieldsFilters({ fTypes: filterOpts.fields }))
}


const HomePage = () => {
    const [filters, setFilters] = useState<filterOptions>({ order: 'DESC', type: 'BUY', fields: [] })
    const [filteredData, setFilteredData] = useState(DATA)
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const temp = [...DATA].map((item) => {
            // if (filters.type !== 'NONE' && filters.type !== item.title) return false;

            item.data = item.data.map((transaction) => {
                const key = Object.keys(transaction)[0]
                const transactions = transaction[key]
                transaction[key] = sortTransactions({ data: transactions, filterOpts: filters })
                return transaction
            })
            return item
            // return true
        })
        setFilteredData(temp)
    }, [filters])

    return (
        <>
            {/* <Stack.Screen options={{
                headerRight: () => <Link href="/actions" asChild className="mr-4"><Button title={"Ações"} /></Link>
            }} /> */}
            <Container>
                <View className="p-2 gap-y-2">
                    <View className="flex-row items-center gap-x-4">
                        <View className="flex-grow">
                            <Searchbar

                                placeholder="Search"
                                onChangeText={setSearchQuery}
                                value={searchQuery}
                            />
                        </View>
                        <HomeTransactionsFilterDialog
                            filters={filters}

                            setFilters={setFilters} />
                    </View>
                    <View className='flex-row gap-x-2'>

                        {filters.fields.includes('total') && <TotalPriceFilter filters={filters} setFilters={setFilters} />}
                        {filters.fields.includes('amount') && <AmountFilter filters={filters} setFilters={setFilters} />}
                        {filters.fields.includes('date') && <DateFilter filters={filters} setFilters={setFilters} />}
                        {filters.fields.includes('price') && <PriceFilter filters={filters} setFilters={setFilters} />}

                    </View>
                </View>
                <TransactionsSectionList data={filteredData} filters={filters} searchQ={searchQuery.toLowerCase()} />
                {/* </View> */}
            </Container>
        </>
    )
}

export default HomePage