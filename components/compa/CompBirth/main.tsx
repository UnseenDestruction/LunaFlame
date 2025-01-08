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


import Readmore from '@/components/horoscope/readmore';




import { uploadImage } from '@/lib/storage';

import BNav from '@/components/Readings/birth/nav';
import BNav1 from '@/components/Readings/birth/navb';

import Calendar from '@/assets/images/horoscope/calendar.svg';
import Right from '@/assets/images/readings/birth/right.svg';



import Csun from '@/assets/images/readings/birth/Planets/Csun.png';
import Cmoon from '@/assets/images/readings/birth/Planets/Cmoon.png';
import Cjupiter from '@/assets/images/readings/birth/Planets/cjupiter.png';
import Cmars from '@/assets/images/readings/birth/Planets/cmars.png';
import CsunR from '@/assets/images/readings/birth/Planets/CsunR.png';
import CjupiterL from '@/assets/images/readings/birth/Planets/CjupiterR.png';
import CmoonR from '@/assets/images/readings/birth/Planets/CmoonR.png';









export default function MCompa({ navigation }: any) {
    const { colorScheme } = useColorScheme();
    const [loading, setLoading] = useState(false)
     const [assistantResponse, setAssistantResponse] = useState<{
      status?: string;
      message?: string;
      analysis?: {
        overview?: {
          percentages?: Record<string, number>;
          summary?: string;
        };
        visionAnalysis?: Record<string, any>;
        detailedInsights?: string;
        career?: {
          description?: string;
        };
        characteristics?: {
          strengths?: string[];
          weaknesses?: string[];
          personality?: string;
        };
      };
    }>({});
    

    const getDate = (date: any) => {
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };


    const today = new Date();


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


    
    
    return (
        <SafeAreaView  style={{ backgroundColor: '#000', flex: 1 }}>
          <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5
      }}>
        <View style={{flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4

        }}>
           <TouchableOpacity onPress={() => navigation.navigate('Nav', {screen: 'Nav', })}
            >
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(50, 50, 50, 1)",
                borderRadius: 999,
              }}
            >
              <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
            </View>
          </TouchableOpacity>
      <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>BIRTH CHARTS</Text>
      </View>
      </View>
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={{
            color: '#fff',
            opacity: 0.7,
            fontFamily: 'Light',
            textAlign: 'center'
        }}>
This report is based on your composite birth chart, created combining your individual birth charts
        </Text>
        </View>

  
    </SafeAreaView>
    );
}
  





