import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { fetchDreamResponse } from '@/lib/guidance';


import Message from '@/assets/images/crystal/message.svg';
import Mic from '@/assets/images/crystal/mic.svg';

export default function CMain({ navigation, setIsLoading, setAnalysisResult }: any) {
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
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <BlurView
        intensity={15}
        tint="light"
        style={{
          overflow: 'hidden',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Nav')}>
          <View style={{ padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999 }}>
            <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
          </View>
        </TouchableOpacity>
        <Text style={{ color: '#FFD854', fontSize: 30, fontFamily: 'Light' }}>CRYSTAL BALL</Text>
      </BlurView>
          <View style={{
            gap: 10
          }}>
          <Animated.View
         style={{
          flexDirection: 'row',
          transform: [{ translateX }],
          justifyContent: 'center',
        }}
        >
          {[...Array(3)].map((_, colIndex) => (
            <TouchableOpacity key={colIndex}>
              <Text
                style={{
                  fontFamily: 'Light',
                  color: '#FFD854',
                  borderColor: '#fff',
                  borderRadius: 999,
                  borderWidth: 0.4,
                  padding: 5,
                  width: 150,
                  opacity: 0.5,
                }}
              >
                Illuminate My Path
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

            
        <Animated.View
         style={{
          flexDirection: 'row',
          transform: [{ translateX }],
          justifyContent: 'center',
        }}
        >
          {[...Array(3)].map((_, colIndex) => (
            <TouchableOpacity key={colIndex}>
              <Text
                style={{
                  fontFamily: 'Light',
                  color: '#FFD854',
                  borderColor: '#fff',
                  borderRadius: 999,
                  borderWidth: 0.4,
                  padding: 5,
                  width: 150,
                  opacity: 0.5,
                }}
              >
                Illuminate My Path
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
        
        <Animated.View
         style={{
          flexDirection: 'row',
          transform: [{ translateX }],
          justifyContent: 'center',
        }}
        >
          {[...Array(3)].map((_, colIndex) => (
            <TouchableOpacity key={colIndex}>
              <Text
                style={{
                  fontFamily: 'Light',
                  color: '#FFD854',
                  borderColor: '#fff',
                  borderRadius: 999,
                  borderWidth: 0.4,
                  padding: 5,
                  width: 150,
                  opacity: 0.5,
                }}
              >
                Illuminate My Path
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
        </View>
      <View>
        <Video
          source={require('@/assets/images/crystal/crystal.mov')}
          style={{ width: '100%', height: 300 }}
          shouldPlay
          isLooping
          isMuted
        />
        <Text
          style={{
            color: '#FFD854',
            fontFamily: 'Bold',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 20,
            position: 'relative',
            top: -20,
          }}
        >
          SEEKING WISDOM?
        </Text>
        <Text
          style={{
            color: '#FFF',
            opacity: 0.5,
            fontFamily: 'Light',
            textAlign: 'center',
            fontSize: 12,
            position: 'relative',
            top: -20,
          }}
        >
          Tap to ask or speak directly
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginTop: 180,
        }}
      >
        <Animated.View
          style={{
            borderColor: '#B2AFFE52',
            borderWidth: 1,
            borderRadius: 999,
            padding: 5,
            transform: [{ scale }],
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 216, 84, 0.5)',
              borderRadius: 999,
              paddingVertical: 12,
              paddingHorizontal: 30,
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Message width={30} height={30} />
            <Text
              style={{
                color: '#FFD854',
                fontSize: 13,
                fontFamily: 'Bold',
              }}
            >
              START A CHAT
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            borderColor: '#B2AFFE52',
            borderWidth: 1,
            borderRadius: 999,
            padding: 5,
            transform: [{ scale }],
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Nav')}
            style={{
              backgroundColor: 'rgba(255, 216, 84, 0.5)',
              width: 180,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 999,
              paddingVertical: 12,
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Mic width={30} height={30} />
            <Text
              style={{
                color: '#FFD854',
                fontSize: 13,
                fontFamily: 'Bold',
              }}
            >
              SPEAK
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
