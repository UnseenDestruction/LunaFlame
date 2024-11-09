import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import Dream from './dream';
import Auth from './auth';


export default function Index({ navigation }: any) {
    const Stack = createStackNavigator();


    return (
        <SafeAreaProvider>
                <Stack.Navigator
                  initialRouteName='Dream'
                  screenOptions={{
                      headerShown: false,
                      animationEnabled: true,
                  }}>
                <Stack.Screen name={'Dream'} component={Dream}/>
                <Stack.Screen name={'Auth'} component={Auth}/>
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}
