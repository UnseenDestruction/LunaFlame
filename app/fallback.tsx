import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { useColorScheme } from 'nativewind';
import { useNetInfo } from '@react-native-community/netinfo';


import Wifi from '@/assets/images/nav/Wifi.svg';
import WifiDark from '@/assets/images/nav/WifiDark.svg';

export default function Fallback({
    navigation
}: any) {
    const netInfo = useNetInfo();
    const { colorScheme } = useColorScheme();

    useEffect(() => {
        if (netInfo.isConnected) {
            navigation.navigate('Loading');
        }
    }, [netInfo]);

    return (
        <SafeAreaView className={`flex flex-1 items-center justify-center`} style={{backgroundColor: colorScheme === 'dark' ? '#191D2B' : '#F2F4FA'}}>
            {colorScheme === 'dark' ? <WifiDark width={150} height={150}/> : <Wifi width={150} height={150}/>}

            <Text className={`font-poppins-medium text-lg mt-2 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                🚧 Weak or No Internet Connection 🚧
            </Text>
        </SafeAreaView>
    )
}
