import { View } from "react-native"
import { Text } from "react-native-paper"

type Props = {title: string, subtitle?:string}

const BasicListItem = ({title, subtitle}: Props) => {
    return (
        <View>
            <Text className='text-lg font-semibold'>{title}</Text>
            <View className="min-h-4">
            {subtitle && <Text className='text-gray-900'>{subtitle}</Text>}
            </View>
        </View>
    )
}

export default BasicListItem