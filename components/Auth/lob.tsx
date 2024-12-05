import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRef, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';

import Donut from '@/assets/images/auth/donut.gif';





export default function LOB({
    lob,
    setLob,
    goNext
}: any) {
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false)



    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Regular: require('@/assets/fonts/Regular.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
        Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
    });
    

    const handleLobChange = (text: string) => {
        setLob(text);
    };

  


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

    console.log(lob)


  if (!loaded) {
    return (
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaProvider>
    );
  }

    return (
        <SafeAreaProvider style={{
            }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
     <SafeAreaView style={{
        flex: 1,
        flexDirection: 'column',
        gap: 10

     }}>
        <Text
        style={{
            fontFamily: 'Light',
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
            opacity: 10
        }}
        >
        To make your journey more insightful, let’s get to know you better.
        </Text>

            <Image
                source={Donut}
                style={{ width: 400, height: 300 }}
                resizeMode={ResizeMode.COVER}
              />
<TextInput
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    color: '#B2AFFE',
                    fontFamily: 'Light',
                    borderWidth: 0.3,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    marginBottom: 10
                  }}
                  placeholder="Type in city of birth"
                  placeholderTextColor="rgba(178, 175, 254, 0.8)"
                  value={lob}
                  onChangeText={handleLobChange}
                  
                />

<View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                <Animated.View style={{    borderColor: '#B2AFFE52',
                            borderWidth: 1, borderRadius: 9999, padding: 5, transform: [{ scale }] }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'rgba(178, 175, 254, 0.5)',
                            borderRadius: 999,
                            paddingVertical: 12,
                            paddingHorizontal: 50,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                          onPress={() => goNext(setLob(""))}
                        >
                          <Text style={{ color: '#fff', fontSize: 13,  fontFamily: 'Bold' }}>I DON'T KNOW</Text>
                        </TouchableOpacity>
                      </Animated.View>




                <Animated.View style={{    borderColor: '#B2AFFE52',
                            borderWidth: 1, borderRadius: 9999, padding: 5, transform: [{ scale }] }}>
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
                          <Text style={{ color: '#000', fontSize: 13,  fontFamily: 'Bold' }}>NEXT</Text>
                        </TouchableOpacity>
                      </Animated.View>
                </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )
}



