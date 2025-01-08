import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Horoscope from '@/components/horoscope/main';



export type HoroscopeParamList = {
  Horoscope: undefined;
};

export default function MHoroscope() {
  const Stack = createStackNavigator<HoroscopeParamList>();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Horoscope"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="Horoscope" component={Horoscope} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
