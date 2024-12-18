import { Button, Text, ActivityIndicator } from 'react-native-paper';
import BuySellPanel from './BuySellPanel';
import { View } from 'react-native';
import { useState } from 'react';
import React from 'react';
import stockInfoType from '~/customTypes/stockInfoType';
import useFetch from '~/hooks/useFetch';
import MARKETSTACK_API_KEY from '~/constants/MarketStackApiKey';
import { stockEODTypeResponse } from '~/customTypes/stockEODType';
// import { Collapsible } from './Collapsible';

type Props = {
  Stock: stockInfoType
}

export default function StockCard({ Stock }: Props) {
  const [showBuySellPanel, setShowBuySellPanel] = useState(false)

  // const { data, isError, isLoading } = useFetch<stockEODTypeResponse>({
  //   url: "http://api.marketstack.com/v1/eod", params: {
  //     'access_key': MARKETSTACK_API_KEY,
  //     'symbols': Stock.symbol,
  //     'limit': 1
  //   }
  // })

  const { data, isLoading } = {
    data: {
      "pagination": {
        "limit": 1,
        "offset": 0,
        "count": 1,
        "total": 251
      },
      "data": [
        {
          "open": 237.27,
          "high": 240.79,
          "low": 237.16,
          "close": 239.59,
          "volume": 48137103,
          "adj_high": 240.79,
          "adj_low": 237.16,
          "adj_close": 239.59,
          "adj_open": 237.27,
          "adj_volume": 48137103,
          "split_factor": 1,
          "dividend": 0,
          "symbol": "AAPL",
          "exchange": "XNAS",
          "date": "2024-12-02T00:00:00+0000"
        }
      ]
    }, isLoading: false
  }

  console.log('rendered StockCard', /*data*/)

  return (

    <View className='p-2'>
      {(!data?.data.length || isLoading) ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>

            {showBuySellPanel ? (
              <BuySellPanel Stock={data.data[0]} />
            ) : (
              <>
                <Text variant="titleLarge">{data.data[0].close}</Text>
                <View className='flex-row justify-between'>
                  <Text variant="bodyMedium">{new Date(data.data[0].date).toLocaleDateString()}</Text>
                  <Text variant="bodyMedium">Volume: {data.data[0].volume}</Text>
                </View>
              </>
            )}
          </View>
          <View className='mt-4'>
            <Button mode="contained" onPress={() => setShowBuySellPanel(!showBuySellPanel)}>
              C/V
            </Button>
          </View>
        </>
      )}
    </View>
  );
};