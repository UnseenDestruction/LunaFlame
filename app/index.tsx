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
import Crystal from './tabs/guidance/crystal';
import Numerology from './tabs/guidance/numerology';
import SignIn from './auth/sigIn';
import SignUp from './auth/signUp';
import Tarrot from './tabs/readings/tarrot/tarrot';
import Birth from './tabs/readings/birth/birth';
import CompBirth from './tabs/compatibility/birth/birth';
import CompZodiac from './tabs/compatibility/zodiac/zodiac';
import Daily from './tabs/readings/tarrot/daily/daily';
import Meanings from './tabs/readings/tarrot/meaning/meanings';
import Yes from './tabs/readings/tarrot/yes/yes';
import Near from './tabs/readings/tarrot/near/near';
import Love from './tabs/readings/tarrot/love/love';
import Chat from '@/components/Guidance/Crystal/chat';
import Speak from '@/components/Guidance/Crystal/speak';

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
                        <Stack.Screen name={'Daily'} component={Daily} />
                        <Stack.Screen name={'Love'} component={Love} />
                        <Stack.Screen name={'Meanings'} component={Meanings} />
                        <Stack.Screen name={'Near'} component={Near} />
                        <Stack.Screen name={'Yes'} component={Yes} />
                        <Stack.Screen name={'CompBirth'} component={CompBirth} />
                        <Stack.Screen name={'CompZodiac'} component={CompZodiac} />
                        <Stack.Screen name={'Palm'} component={Palm} />
                        <Stack.Screen name={'Birth'} component={Birth} />
                        <Stack.Screen name={'Crystal'} component={Crystal} />
                        <Stack.Screen name={'Tarrot'} component={Tarrot} />
                        <Stack.Screen name={'Chat'} component={Chat} />
                        <Stack.Screen name={'Speak'} component={Speak} />
                        <Stack.Screen name={'Numerology'} component={Numerology} />
                        <Stack.Screen name={'SignIn'} component={SignIn} />
                        <Stack.Screen name={'SignUp'} component={SignUp} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    ); 
}
