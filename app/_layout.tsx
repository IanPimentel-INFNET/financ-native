import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  // adaptNavigationTheme,
  // Text,
} from 'react-native-paper';

import '../global.css';

import { Stack } from 'expo-router';
// import { View } from 'react-native';
import { useColorScheme } from 'react-native';


export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider
      theme={
        // colorScheme === 'light' ?
          MD3LightTheme
          // : MD3DarkTheme
        }
    >
      {/* <View><Text>Teste</Text></View> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
