import React, {useCallback, useState} from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Auth({
    navigation
}: any) {
  

    return (
        <SafeAreaProvider className={""} >
        <Text>Hello</Text>
        </SafeAreaProvider>
    )
}
