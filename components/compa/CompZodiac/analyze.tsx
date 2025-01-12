import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useFonts } from 'expo-font';

import Soul from '@/assets/images/Dream/soul.gif'; 
import Cloud1 from '@/assets/images/Dream/cloud1.svg'
import Cloud5 from '@/assets/images/Dream/cloud5.png'


export default function ZodiacAnalyze({ navigation }: any) {
    const cloud1Animation = useRef(new Animated.Value(0)).current;
    const cloud5Animation = useRef(new Animated.Value(0)).current;
    const pulseAnimation = useRef(new Animated.Value(10)).current;

    

    const [loaded] = useFonts({
      Light: require('@/assets/fonts/Light.ttf'),
      Regular: require('@/assets/fonts/Regular.ttf'),
      Medium: require('@/assets/fonts/Medium.ttf'),
      Semibold: require('@/assets/fonts/Semibold.ttf'),
      Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
  });
  



    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(cloud5Animation, {
                    toValue: -40,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(cloud5Animation, {
                    toValue: 40,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();

    }, [ cloud5Animation]);



    if (!loaded) {
      return (
        <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
          <ActivityIndicator size="large" color="#B2AFFE" />
        </SafeAreaProvider>
      );
    }
    

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
    colors={['#000', '#464462']} 
    start={{ x: 0, y: 0}} 
    end={{ x: 0, y: 1.2 }} 
    style={{
      position: 'absolute',
      width: '120%',
      height: '140%',
      borderRadius: 15,
    }}
  />

  <View>
  <Text
            style={{
              fontFamily: "Bold",
              color: "#B2AFFE",
              fontSize: 30,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            10%
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              color: "#B2AFFE",
              fontSize: 16,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Analysing your report
          </Text>
  </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

