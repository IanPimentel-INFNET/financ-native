import { Link, router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native"
import { Button, Card, List } from "react-native-paper"
import InputAndAction from "~/components/InputAndAction";
import { stockInfoResponse } from "~/customTypes/stockInfoType";

const DATA: stockInfoResponse = {
    pagination: {
        limit: 100,
        offset: 0,
        count: 100,
        total: 293878
    },
    data: [
        {
            name: "Microsoft Corporation",
            symbol: "MSFT",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
        {
            name: "Apple Inc",
            symbol: "AAPL",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
        {
            name: "Amazon.com Inc",
            symbol: "AMZN",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
        {
            name: "Alphabet Inc - Class C",
            symbol: "GOOG",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
        {
            name: "Alphabet Inc - Class A",
            symbol: "GOOGL",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
        {
            name: "Alibaba Group Holding Ltd",
            symbol: "BABA",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "New York Stock Exchange",
                acronym: "NYSE",
                mic: "XNYS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nyse.com"
            }
        },
        {
            name: "Meta Platforms Inc - Class A",
            symbol: "FB",
            has_intraday: false,
            has_eod: true,
            country: null,
            stock_exchange: {
                name: "NASDAQ Stock Exchange",
                acronym: "NASDAQ",
                mic: "XNAS",
                country: "USA",
                country_code: "US",
                city: "New York",
                website: "www.nasdaq.com"
            }
        },
    ]
}

const index = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredData, setfilteredData] = useState(DATA.data)

    function filterData(){
        setfilteredData(DATA.data.filter(act => {
            return searchQuery === '' ||
             act.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
             act.name.toLowerCase().includes(searchQuery.toLowerCase())
        }))
    }

    return (
        <View className="p-4">
            <Card>
                <Card.Title
                    title="Card Title"
                // subtitle="Card Subtitle"
                //  left={LeftContent}
                />
                <Card.Content className="h-80">
                    <InputAndAction
                        placeholder={'Nome da Seção'}
                        icon={'magnify'}
                        text={searchQuery}
                        setText={setSearchQuery}
                        onPress={filterData}
                    />
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <Pressable onPress={()=>{}}>
                                <List.Item
                                    title={item.name}
                                    description={item.symbol}
                                // left={props => <List.Icon {...props} icon="folder" />}
                                />
                            </Pressable>

                        )}
                        keyExtractor={item => item.symbol}
                    />
                </Card.Content>
                <Card.Actions>
                    <Link href="/bolsa" asChild>
                        <Button>Cancel</Button>
                    </Link>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

export default index