import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator,  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ReadingsParamList } from '../Mreadings';
import Number from '@/assets/images/numerology/number.svg'

import Dream from '../guidance/dream';


import Birth from '@/assets/images/readings/birth/symbols.svg';
import Plus from '@/assets/images/compatibility/birth/plus.svg';
import RedPlus from '@/assets/images/compatibility/birth/redPlus.svg';
import Leo from '@/assets/images/zodiac/leo.svg';
import Cancer from '@/assets/images/zodiac/cancer.png';


export default function Horoscope() {
    const navigation = useNavigation<NavigationProp<ReadingsParamList>>();

    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
       Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
    });

    if (!loaded) {
        return (
          <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#B2AFFE" />
          </SafeAreaProvider>
        );
      }


    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000', padding: 5, gap: 18 }}>
             <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>HOROSCOPE</Text>
        </SafeAreaProvider>
    );
}
