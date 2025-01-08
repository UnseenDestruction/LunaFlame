import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ImageRes } from '@/lib/readings';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';


export default function BNav1()  {

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
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
           }}>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <View style={{
                 backgroundColor: '#B2AFFE',
                 width: '200%',
                 height: 1
              }} />
              <Text style={{
                 color: '#B2AFFE', fontSize: 18,  fontFamily: 'Bold',
              }} >
              Daily Transits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.3
            }}>
              <View style={{
                 backgroundColor: '#B2AFFE',
                 width: '200%',
                 height: 1
              }} />
              <Text style={{
                 color: '#B2AFFE', fontSize: 18,  fontFamily: 'Bold',
              }} >
               Your Chart
              </Text>
            </TouchableOpacity>
           </View>
    )

}




