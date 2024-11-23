import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
import DreamStars from '@/assets/images/Dream/dreamStars.mp4';
import Diamond from '@/assets/images/Dream/diamond.svg';
import { fetchDreamResponse } from '@/lib/dream'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function Main({ navigation, setIsLoading, setAnalysisResult }: any) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setMainLoading] = useState(false);


  const [loaded] = useFonts({
    Light: require('@/assets/fonts/Light.ttf'),
    Regular: require('@/assets/fonts/Regular.ttf'),
    Medium: require('@/assets/fonts/Medium.ttf'),
    Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
});




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


  if (!loaded) {
    return (
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={{flex: 1, }}>
      <GestureHandlerRootView style={{ flex: 1,   }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000",}}>
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
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Nav')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
              </TouchableOpacity>
            
                    <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>DREAM EXPLAIN</Text>
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
              <Text style={{ color: '#B2AFFE', textAlign: 'center', marginBottom: 10, width: '60%', fontFamily: 'Light', }}>
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
                    fontFamily: 'Light',
                  }}
                  placeholder="Describe your dream..."
                  placeholderTextColor="rgba(178, 175, 254, 1)"
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#B2AFFE" />
                  ) : (
                    inputText.length >= 20 && (
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
                          onPress={handleSend}
                        >
                          <Text style={{ color: '#000', fontSize: 13,  fontFamily: 'Bold' }}>REVEAL DREAM</Text>
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
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
