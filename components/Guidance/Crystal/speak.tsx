import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { fetchDreamResponse } from '@/lib/guidance';



import Message from '@/assets/images/crystal/message.svg';
import Mic from '@/assets/images/crystal/mic.svg';
import Wrong from '@/assets/images/crystal/wrong.svg';
import Animate from '@/assets/images/crystal/animate.mov';

export default function Speak({ navigation, setIsLoading, setAnalysisResult }: any) {
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
      <View style={{  position: 'absolute',  alignItems: 'center', justifyContent: 'center', top: -30 }}>
              <Video
             source={require('@/assets/images/crystal/animate.mov')}
                style={{ width: 420, height: 220 }}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            </View>
  
    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
    }}>

<View style={{
    borderRadius: 30,
    width: '50%',
    borderColor: '#EAA6001A',
    borderWidth: 1,
    height: '50%'
}}>
<Text
              style={{
                color: '#FFD854',
                fontSize: 13,
                fontFamily: 'Bold',
                opacity: 0.6
              }}
            >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            </Text>
</View>
 

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
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
       onPress={() => navigation.navigate('Chat')}
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
           
          </TouchableOpacity>
        </Animated.View>

        <Text
              style={{
                color: '#FFF',
                fontSize: 13,
                fontFamily: 'Bold',
                opacity: 0.6
              }}
            >
            Start a new Chat
            </Text>

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
       onPress={() => navigation.navigate('Crystal')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.24)',
              borderRadius: 999,
              paddingVertical: 12,
              paddingHorizontal: 30,
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Wrong width={30} height={30} style={{
              opacity: 1
            }} />
            
          </TouchableOpacity>
        </Animated.View>
      </View>
      </View>
    </SafeAreaView>
  );
}
