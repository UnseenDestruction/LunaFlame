import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Nav from '@/app/nav';
import { useNetInfo } from '@react-native-community/netinfo';
import Fallback from './fallback';
import Dream from './tabs/guidance/dream';
import Main from '../components/Dream/main';
import Analyze from '../components/Dream/analyze';
import Result from './tabs/guidance/Dresult';
import MGuidance from './tabs/MainGuidance';

export default function Index() {
    const Stack = createStackNavigator();
    const netInfo = useNetInfo();

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Auth"
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                        }}
                    >
                         <Stack.Screen name="Auth" component={Auth} />
                        <Stack.Screen name={'Nav'} component={Nav} />
                        <Stack.Screen name={'Dream'} component={Dream} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
