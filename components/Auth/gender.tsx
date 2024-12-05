import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Female from '@/assets/images/auth/gender/female.svg';
import Male from '@/assets/images/auth/gender/male.svg';
import Other from '@/assets/images/auth/gender/other.svg';
import Logo from '@/assets/images/auth/gender/gender.svg';

export default function Gender({
    gender,
    setGender,
    goNext,
}: any) {
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false);

    console.log(gender)

    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Regular: require('@/assets/fonts/Regular.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
        Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
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
            <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#B2AFFE" />
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <SafeAreaView style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                        <Text
                            style={{
                                fontFamily: 'Light',
                                color: '#fff',
                                fontSize: 16,
                                textAlign: 'center',
                                opacity: 10,
                            }}
                        >
                            To make your journey more insightful, let’s get to know you better.
                        </Text>

                        <Logo width={400} height={300} />
                        <View style={{ marginTop: 40, marginBottom: 30 }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                                {['Male', 'Female'].map((option, index) => (
                                    <View key={index} style={{ position: 'relative' }}>
                                        {gender === option && (
                                            <LinearGradient
                                                colors={['#000', '#B2AFFE']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 3, y: 0 }}
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 20,
                                                }}
                                            />
                                        )}
                                        <TouchableOpacity
                                            onPress={() => setGender(option)}
                                            style={{
                                                flexDirection: 'column',
                                                borderWidth: 1,
                                                borderRadius: 20,
                                                gap: 2,
                                                padding: 20,
                                                width: 200,
                                                borderColor: '#B2AFFE',
                                                opacity: gender === option ? 1 : 0.5,
                                            }}
                                        >
                                            {option === 'Male' ? <Male width={40} height={40} /> : <Female width={40} height={40} />}
                                            <Text
                                                style={{
                                                    fontFamily: "Bold",
                                                    color: '#B2AFFE',
                                                }}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setGender('Other')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        gap: 2,
                                        padding: 10,
                                        paddingHorizontal: 20,
                                        borderColor: '#B2AFFE',
                                        opacity: gender === 'Other' ? 1 : 0.5,
                                        marginTop: 10,
                                    }}
                                >
                                    <Other width={40} height={40} />
                                    <Text
                                        style={{
                                            fontFamily: "Bold",
                                            color: '#B2AFFE',
                                            fontSize: 18,
                                        }}
                                    >
                                        Other
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            <Animated.View style={{
                                borderColor: '#B2AFFE52',
                                borderWidth: 1,
                                borderRadius: 9999,
                                padding: 5,
                                transform: [{ scale }],
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'rgba(178, 175, 254, 0.5)',
                                        borderRadius: 999,
                                        paddingVertical: 12,
                                        paddingHorizontal: 70,
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4.65,
                                        elevation: 8,
                                    }}
                                    onPress={() => goNext(setGender(""))}
                                >
                                    <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Bold' }}>SKIP</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View style={{
                                borderColor: '#B2AFFE52',
                                borderWidth: 1,
                                borderRadius: 9999,
                                padding: 5,
                                transform: [{ scale }],
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#B2AFFE',
                                        borderRadius: 999,
                                        paddingVertical: 12,
                                        paddingHorizontal: 70,
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4.65,
                                        elevation: 8,
                                    }}
                                    onPress={goNext}
                                >
                                    <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Bold' }}>NEXT</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );
}
