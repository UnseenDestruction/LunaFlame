import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import DreamStars from '@/assets/images/Dream/dreamStars.mp4';
import Diamond from '@/assets/images/Dream/diamond.svg';
import { fetchDreamResponse } from '@/lib/dream'; 

export default function Main({ navigation, setIsLoading, setAnalysisResult }: any) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setMainLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.length < 20) return; 


    setIsLoading(true);

    try {
      const response = await fetchDreamResponse(inputText);

      if (response?.content) {
        const { content, image, userMessage } = response;

        setInputText(""); 
        setIsLoading(true);


        setAnalysisResult({ content, image, userMessage });
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching the dream response:", error);
    } finally {
      setIsLoading(false)
    }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={{ height: '60%', position: 'absolute', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Video
                source={DreamStars}
                style={{ width: 500, height: 800 }}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            </View>

            <BlurView
              intensity={35}
              tint="light"
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
              <Text style={{ color: '#B2AFFE', fontSize: 30 }}>Dream Explain</Text>
              <Diamond width={50} height={50} />
            </BlurView>

            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 40,
              }}
            >
              <Text style={{ color: '#B2AFFE', textAlign: 'center', marginBottom: 10, width: '60%' }}>
                Describe your dream and let Luna give you a clue about what it means
              </Text>

              <BlurView intensity={32} tint="light" style={{ overflow: 'hidden', borderRadius: 20, padding: 10, alignItems: 'center' }}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={{
                    width: 350,
                    height: 150,
                    borderRadius: 10,
                    padding: 20,
                    textAlign: 'center',
                    color: '#B2AFFE',
                  }}
                  placeholder="Describe Your Dream"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#B2AFFE" />
                  ) : (
                    inputText.length >= 20 && (
                        <Animated.View style={{ transform: [{ scale }] }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#B2AFFE',
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
                          onPress={handleSend}
                        >
                          <Text style={{ color: '#000', fontSize: 13, fontWeight: 'bold' }}>REVEAL DREAM</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    )
                  )}
                </View>
              </BlurView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}
