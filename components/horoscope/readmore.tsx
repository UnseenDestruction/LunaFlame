import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ImageRes } from '@/lib/readings';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';






import { uploadImage } from '@/lib/storage';

import BNav from './nav';

import Calendar from '@/assets/images/horoscope/calendar.svg';
import Right from '@/assets/images/readings/birth/right.svg';


import Jupiter from '@/assets/images/readings/birth/Planets/jupiter0.png';
import Moon from '@/assets/images/readings/birth/Planets/Moon0.png';
import Mars from '@/assets/images/readings/birth/Planets/Mars0.png';
import Pluto from '@/assets/images/readings/birth/Planets/Pluto0.png';
import Mercury from '@/assets/images/readings/birth/Planets/Mercury0.png';
import Saturn from '@/assets/images/readings/birth/Planets/Saturn0.png';
import Venus from '@/assets/images/readings/birth/Planets/Venus0.png';



import Csun from '@/assets/images/readings/birth/Planets/Csun.png';
import Cmoon from '@/assets/images/readings/birth/Planets/Cmoon.png';
import Cjupiter from '@/assets/images/readings/birth/Planets/cjupiter.png';
import Cmars from '@/assets/images/readings/birth/Planets/cmars.png';




export default function Readmore()  {


    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
      });
    
    const scale = useRef(new Animated.Value(1)).current;


    useEffect(() => {
      const pulse = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.1,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      pulse();
    }, [scale]);



    if (!loaded) {
        return (
          <SafeAreaProvider
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            <ActivityIndicator size="large" color="#B2AFFE" />
          </SafeAreaProvider>
        );
      }



    return(
        <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            marginTop: 5
            
          }}>
             <View style={{
            backgroundColor: '#fff',
            height: 5,
            width: 5,
            borderRadius: 9999,
            opacity: 0.8
          }}/>
             <View style={{
            backgroundColor: '#fff',
            height: 10,
            width: 10,
            borderRadius: 9999,
            opacity: 0.8
          }}/>
          <View style={{
            backgroundColor: '#fff',
            height: 5,
            width: 5,
            borderRadius: 9999,
            opacity: 0.8
          }}/>
        
          <Animated.View
        style={{
          transform: [{ scale }],
           paddingHorizontal: 10,
        }}
      >
<Text
style={{    
color: "#fff",
fontSize: 20,
fontFamily: 'Bold',         
textShadowOffset: { width: 0, height: 0 },
}}
>
Read more
</Text>
      </Animated.View>
      <View style={{
            backgroundColor: '#fff',
            height: 5,
            width: 5,
            borderRadius: 9999,
            opacity: 0.8
          }}/>
             <View style={{
            backgroundColor: '#fff',
            height: 10,
            width: 10,
            borderRadius: 9999,
            opacity: 0.8
          }}/>
          <View style={{
            backgroundColor: '#fff',
            height: 5,
            width: '53%',
            borderRadius: 9999,
            opacity: 0.8
          }}/>
      </TouchableOpacity>
    )

}




