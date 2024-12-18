import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
type Props = {
    text: string,
    placeholder?: string,
    icon: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    onPress: () => void;
}
const InputAndAction = ({placeholder, icon, text, setText, onPress}: Props) => {
    return (
        <View className='flex-row'>
                <View className='flex-grow'>
                    <TextInput
                        placeholder={placeholder}
                        value={text}
                        onChangeText={setText}
                    />
                </View>
                <IconButton
                    size={30}
                    containerColor='#16a34a'
                    iconColor='white'
                    onPress={onPress}
                    icon={icon}
                />
            </View>
    )
}

export default InputAndAction