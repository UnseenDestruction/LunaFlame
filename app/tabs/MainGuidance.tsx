import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Analyze from '@/components/Guidance/Dream/analyze';
import Result from './guidance/Dresult';
import Main from '@/components/Guidance/Dream/main';
import Guidance from './guidance/guidance';
import Dream from './guidance/dream';
import CMain from '@/components/Guidance/Crystal/main';
import NMain from '@/components/Guidance/Numero/main';

export type GuidanceStackParamList = {
  Guidance: undefined;
  Crystal: undefined;
  Numerology: undefined;
  Dream: undefined;
  Nav: undefined;
};

export default function MGuidance() {
  const Stack = createStackNavigator<GuidanceStackParamList>();



  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Guidance"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="Guidance" component={Guidance} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
