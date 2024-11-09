import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity,  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated, Image, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import DreamStars from '@/assets/images/Dream/dreamStars.mp4';
import Diamond from '@/assets/images/Dream/diamond.svg';
import { fetchDreamResponse } from '@/lib/dream';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useFonts } from 'expo-font';


export default function Result({ navigation, setIsLoading, assistantResponse, image, userMessage }: any) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setMainLoading] = useState(false);
  const pulseAnimation = useRef(new Animated.Value(10)).current;

  console.log(assistantResponse)
  console.log(image)
  console.log(userMessage)


  const [fontsLoaded] = useFonts({
    SourGummy: require('@/assets/fonts/SourGummy.ttf'), 
});

useEffect(() => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(pulseAnimation, {
                toValue: 20, 
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.timing(pulseAnimation, {
                toValue: 10, 
                duration: 1000,
                useNativeDriver: false,
            }),
        ])
    ).start();
}, [pulseAnimation]);



  const handleSend = () => {
    setMainLoading(true);
    setTimeout(() => {
      setMainLoading(false);
      setInputText(""); 
      setIsLoading(true);  
    }, 2000); 
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

  return (
    <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <View
              style={{
                overflow: 'hidden',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row',
                borderRadius: 10,
                padding: 10,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: '#B2AFFE', fontSize: 30 }}>DREAM REVEALED</Text>
              <Diamond width={50} height={50} />
            </View>
            <View style={{ height: '60%',   width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 220 }}>
              <Image
                source={{uri: image}}
                style={{ width: 500, height: 500 }}
                resizeMode={ResizeMode.COVER}
              />
            </View>

        
        <View  style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center'  }}>
                <LinearGradient
      colors={['#252376', '#000']}
      style={{ width: '90%',  borderColor: '#B2AFFE', borderWidth: 1, borderRadius: 10, padding: 10, height: '100%', gap: 60, position: 
        'relative', top: 320, zIndex: 50
      }}
      locations={[0.2, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
                    <View>
                    <Animated.Text style={{ color: '#B2AFFE', fontSize: 25, marginBottom: 10, width: '100%',    fontFamily: 'SourGummy',
    textShadowColor: '#B2AFFE',  textShadowRadius: pulseAnimation,     textShadowOffset: { width: 0, height: 0 } }}>
                Your Dream Revealed
              </Animated.Text>
              <Text style={{ color: '#FFDEE9',   textAlign: 'center' }}>
               {assistantResponse}
            </Text>
                    </View>
              <View>
              <Animated.Text style={{ color: '#B2AFFE', fontSize: 18, marginBottom: 10, width: '60%',  fontFamily: 'SourGummy',  textShadowRadius: pulseAnimation,  textShadowColor: '#B2AFFE',  textShadowOffset: { width: 0, height: 0 } }}>
                Your dream
              </Animated.Text>
              <Text style={{ color: '#FFDEE9',  padding: 2 }}>
               {userMessage}
            </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 4 }}>
              <TouchableOpacity
                          style={{
                            backgroundColor: '#B2AFFE',
                            borderRadius: 999,
                            paddingVertical: 12,
                            paddingHorizontal: 30,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                          onPress={handleSend}
                        >
                          <Text style={{ color: '#000', fontSize: 13, fontWeight: 'bold' }}>ANOTHER DREAM</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            backgroundColor: '#B2AFFE',
                            borderRadius: 999,
                            paddingVertical: 12,
                            paddingHorizontal: 30,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                          onPress={handleSend}
                        >
                          <Text style={{ color: '#000', fontSize: 13, fontWeight: 'bold' }}>BACK TO HOME</Text>
                        </TouchableOpacity>
              </View>
              </LinearGradient>
              </ScrollView>
              </View>
          </SafeAreaView>
    </SafeAreaProvider>
  );
}
