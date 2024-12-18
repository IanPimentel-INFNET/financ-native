import { StyleSheet } from "nativewind"
import { Image, View } from "react-native"
import { Text } from "react-native-paper"

const nome = "Ian"

const WelcomeHeader = () => {
    return (
        <View className="flex-row p-4 items-center gap-4">
        <Image
          source={{ uri: 'https://thispersondoesnotexist.com/' }}
          className="h-12 w-12 rounded-full"
        />
        <Text>Olá, {nome}!!</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    welcomeText: {
      fontSize: 18,
      flex: 1,
    },
    searchButton: {
      marginTop: 20,
      width:"100%"
    },
  });

export default WelcomeHeader