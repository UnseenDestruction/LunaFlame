import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Compatibility from './compatibility/compa';



export type CompatibilityParamList = {
  Compatibility: undefined;
  CompBirth: undefined;
  CompZodiac: undefined;
  
};

export default function MCompatibility() {
  const Stack = createStackNavigator<CompatibilityParamList>();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Compatibility"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="Compatibility" component={Compatibility} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
