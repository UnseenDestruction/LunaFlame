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
import Palm from './tabs/readings/palm/palm';
import Main from '../components/Guidance/Dream/main';
import Analyze from '../components/Guidance/Dream/analyze';
import Result from './tabs/guidance/Dresult';
import MGuidance from './tabs/MainGuidance';
import Capture from '@/components/Readings/palm/captured';

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
                        <Stack.Screen name={'Palm'} component={Palm} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
