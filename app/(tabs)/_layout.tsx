import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import { Icon } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import WelcomeHeader from '~/components/WelcomeHeader';

const TabsLayout = () => {
    return Platform.OS === 'android' ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                    }}
                />
                <Drawer.Screen
                    name="actions/index"
                options={{
                    drawerLabel: "Bolsa",
                    title: "Bolsa"
                }}
                />
                <Drawer.Screen
                    name="user/index"
                options={{
                    drawerLabel: "Configurações",
                    title: "Configurações"
                }}
                />
            </Drawer>
        </GestureHandlerRootView>
    ) : (
        <Tabs screenOptions={{
            header:WelcomeHeader
        }}>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: "Home",
                    tabBarIcon: () => <Icon source={'home-outline'} size={20}/>
                }}
            />
            <Tabs.Screen
                name="bolsa/index"
                options={{
                    title: "ignorar",
                    // tabBarIcon: () => <Icon source={'home-outline'} size={20}/>
                    // tabBarIcon: () => <Icon source={'cash-100'} size={20}/>
                }}
            />
            <Tabs.Screen
                name="configs/index"
                options={{
                    title: "Bolsa",
                    tabBarIcon: () => <Icon source={'cash-100'} size={20}/>
                    // tabBarIcon: () => <Icon source={'cog-outline'} size={20}/>
                }}
            />
        </Tabs>
    )
}

export default TabsLayout