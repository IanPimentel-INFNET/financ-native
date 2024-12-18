import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import stockEODType from '~/customTypes/stockEODType';

type Props = {
  Stock: stockEODType
}


export default function BuySellPanel({ Stock }: Props) {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(Number(quantity) * Stock.close);
  }, [quantity]);

  return (
    <View className='mt-2'>
      <Text className='mb-2' variant="titleMedium">
        Valor Total: ${totalPrice.toFixed(2)}
      </Text>
      <View className='flex-row mb-4 '>
        <IconButton
          disabled={!quantity}
          size={30}
          containerColor={!quantity?'#fca5a5':'#dc2626'}
          iconColor='white'
          onPress={() => setQuantity(quantity - 1)}
          icon={'minus'}
        />

        <TextInput
          mode="outlined"
          style={{flex:1}}
          value={String(quantity)}
          onChangeText={(value) => {
            if (!isNaN(+value)) {
              setQuantity(+value)
            }
          }}
          keyboardType="numeric"

        />

        <IconButton
        size={30}
          containerColor='#16a34a'
          iconColor='white'
          onPress={() => setQuantity(quantity + 1)}
          icon={'plus'}
        />
      </View>
      <View className='flex-row justify-between'>
        <Button disabled={!quantity} mode="contained" onPress={() => { }}>
          Vender
        </Button>
        <Button disabled={!quantity} mode="contained" onPress={() => { }}>
          Comprar
        </Button>
      </View>
    </View>
  );
};