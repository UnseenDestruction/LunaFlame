import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Profile from './profile/prof';



export type ProfileParamList = {
  Profile: undefined;
};

export default function MProfile() {
  const Stack = createStackNavigator<ProfileParamList>();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Profile"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
