import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import Wheel from '@/assets/images/guidance/numerology/wheel.png';

export default function NumeroAnalyze({ navigation }: any) {
    const rotationAnimation = useRef(new Animated.Value(0)).current;

    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Regular: require('@/assets/fonts/Regular.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
        Semibold: require('@/assets/fonts/Semibold.ttf'),
        Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotationAnimation, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotationAnimation]);

    const rotateInterpolate = rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    if (!loaded) {
        return (
            <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#B2AFFE" />
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <Animated.Image
                    source={Wheel}
                    style={{
                        width: 400,
                        height: 400,
                        borderRadius: 999,
                        borderWidth: 3,
                        borderColor: 'rgba(107, 77, 150, 0.32)',
                        opacity: 0.8,
                        transform: [{ rotate: rotateInterpolate }],
                    }}
                    resizeMode="cover"
                />
                <Text
                    style={{
                        fontSize: 30,
                        fontFamily: 'Bold',
                        color: '#FC0160',
                        marginTop: 30,
                        textAlign: 'center'
                    }}
                >
                    The stars are aligning your numerology
                </Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
