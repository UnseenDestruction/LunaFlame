import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Animated, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { fetchDreamResponse } from '@/lib/guidance';

import Name from '@/components/Auth/Name';
import DOB from '@/components/Auth/dob';


import Lines from '@/assets/images/numerology/lines.svg';

export default function NMain({ navigation, setIsLoading, setAnalysisResult }: any) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setMainLoading] = useState(false);

  const [loaded] = useFonts({
    Light: require('@/assets/fonts/Light.ttf'),
    Regular: require('@/assets/fonts/Regular.ttf'),
    Medium: require('@/assets/fonts/Medium.ttf'),
    Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
  });


  const scale = useRef(new Animated.Value(1)).current;


  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateRow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 100,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: 5000, 
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateRow();
  }, [translateX]);

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

  const handleSend = async () => {
    if (inputText.length < 20) return;

    setIsLoading(true);
    try {
      const response = await fetchDreamResponse(inputText);
      if (response?.content) {
        const { content, image, userMessage } = response;
        setInputText("");
        setAnalysisResult({ content, image, userMessage });
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching the dream response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!loaded) {
    return (
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#FC0160" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Nav')}>
          <View style={{ padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999 }}>
            <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
          </View>
        </TouchableOpacity>
        <Text style={{ color: '#FC0160', fontSize: 30, fontFamily: 'Light',  }}>NUMEROLOGY</Text>
      </View>
        <Lines width={450} height={450}
        style={{
            position: 'relative',
            top: -300,
            right: 15,
            opacity: 0.7
        }}

        />

<View style={{
    gap: 10,
    position: 'relative',
    top: -200,
    marginBottom: 120
}}>
           
            <TextInput
                placeholder={'Enter your full name'}
                placeholderTextColor={'#FC0160'}
                style={{
                    fontFamily: 'Light',
                    borderWidth: 0.5,
                    borderColor: '#FC0160',
                    borderRadius: 10,
                    padding: 20,
                    opacity: 0.7
                }}
            />
             <TextInput
                placeholder={'Select your date of birth'}
                placeholderTextColor={'#FC0160'}
                style={{
                    fontFamily: 'Light',
                    borderWidth: 0.5,
                    borderColor: '#FC0160',
                    borderRadius: 10,
                    padding: 20,
                    opacity: 0.7
                    
                }}
                
            />
        </View>

      <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18
                    }}>
                       <View style={{
                      backgroundColor: '#FC0160',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                    <View style={{
                      backgroundColor: '#FC0160',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                  
                  
                    <Animated.View
                  style={{
                    borderColor: "#FC016052",
                    borderWidth: 1,
                    borderRadius: 999,
                    padding: 5,
                    transform: [{ scale }],
                  }}
                >
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Nav')}
          style={{
            backgroundColor: "#FC0160",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 50,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4.65,
            elevation: 8,
          }}
        >
  <Text
    style={{
      fontSize: 12,
      fontFamily: 'Bold'
    }}
  >
    REVEAL MY NUMEROLOGY
  </Text>
</TouchableOpacity>
                </Animated.View>
                <View style={{
                      backgroundColor: '#FC0160',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                <View style={{
                      backgroundColor: '#FC0160',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                </View>
    </SafeAreaView>
  );
}
