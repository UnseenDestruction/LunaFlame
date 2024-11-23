import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useFonts } from 'expo-font';

import Soul from '@/assets/images/Dream/soul.gif'; 
import Cloud1 from '@/assets/images/Dream/cloud1.svg'
import Cloud5 from '@/assets/images/Dream/cloud5.png'


export default function Analyze({ navigation }: any) {
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
          colors={['#252376', '#000']} 
          style={StyleSheet.absoluteFillObject} 
          locations={[0.2, 1]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', position: 'relative', top: -170, zIndex: 50}}>
            <Animated.Image
              source={Cloud5} 
              style={{
                position: 'relative',
                width: '100%', 
                height: '100%', 
                resizeMode: 'contain',
                left:  80,
                opacity: 0.4,
                top: -100,
                transform: [{ translateX: cloud5Animation }],
              }}
              />
            <Cloud1  width={'100%'} height={200} style={{position: 'relative', right:  150, opacity: 0.6, top: -40}}/>
            </View>
            <View>
            </View>
          <View style={{ height: '100%', position: 'absolute', width: '100%', alignItems: 'center', justifyContent: 'center',}}>
            <Image
              source={Soul} 
              style={{
                width: '100%', 
                height: '65%', 
                position: 'relative',
                top: -165,
                zIndex: 0,
                opacity: 0.8
              }}
            />
          </View>
                    <Text 
            style={{    
              color: "#FFFFFF",
              fontSize: 25,
              textShadowColor: "#B2AFFE",
              textShadowRadius: 10,       
              fontFamily: 'Bold',         
              textShadowOffset: { width: 0, height: 0 },
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            Analysing your dream
          </Text>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', width: '100%', }}>
            <Animated.Image
              source={Cloud5} 
              style={{
                position: 'relative',
                width: '100%', 
                height: '100%', 
                resizeMode: 'contain',
                opacity: 0.5,
                transform: [{ translateX: cloud5Animation }],
              }}
            />
              <Cloud1 width={'100%'} height={250} style={{ position: 'relative', right: 120, opacity: 0.7 }} />
            </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

