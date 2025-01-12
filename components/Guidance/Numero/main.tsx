import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'; 
import { fetchNumerologyResponse } from '@/lib/guidance';
import { supabase } from '@/lib/supabase';


import Name from '@/components/Auth/Name';
import DOB from '@/components/Auth/dob';


import Wheel from '@/assets/images/guidance/numerology/wheel.png';
import Calendar from '@/assets/images/guidance/numerology/calendar.svg';



interface UserInfo {
  id: number;
  name: string;
  birth: string;
  sun_sign: string;
  moon_sign: string;
  ascendant: string;
  element: string;
  gender: string;
  userId: string;
  affirmation?: string;
  features?: string;
  lunar_calendar?: string;
  matches?: string;
  todayHoroscope?: string | null;
}

export default function NMain({  userData, navigation, setIsLoading, setAnalysisResult }: any) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  

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


  useEffect(() => {
    const fetchData = async () => {
        const { data, error: sessionError } = await supabase.auth.getSession();
        const userId = data?.session?.user?.id || "";

      try {
        const { data, error } = await supabase
          .from('horoscopes') 
          .select('*')
          .eq('userId', userId)
          .single()
          
        setUserInfo(data)
        if (error) throw error;
      } catch (error: any) {
        console.error('Error fetching data from Supabase:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);


  const userName = userInfo?.name;
  const dob = userInfo?.birth;


  const handleSend = async () => {

    setIsLoading(true);
    try {
      const response = await fetchNumerologyResponse(userName, dob);
      if (response?.content) {
        const { content} = response;
        setInputText("");
        setAnalysisResult({ content });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#010001' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <KeyboardAvoidingView
          style={{  }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <View
            
    
              style={{
                overflow: 'hidden',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                zIndex: 1,
                gap: 10,
                borderRadius: 10,
                padding: 10,
                paddingVertical: 10,
                backgroundColor: '#22000c'
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Nav')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
              </TouchableOpacity>
            
                    <Text style={{ color: '#FC0160', fontSize: 30,  fontFamily: 'Light',  }}>NUMEROLOGY</Text>
            </View>

            <Image 
    source={Wheel} 
    style={{ 
      width: 500, 
      height: 500, 
      borderRadius: 999, 
      borderWidth: 3,
      borderColor: 'rgba(107, 77, 150, 0.32)',
      opacity: 0.8,
      position: 'absolute', 
      top: -300,
      left: -40,
      zIndex: 0
    }} 
    resizeMode="cover" 
  />

<View style={{
    gap: 10,
    marginTop: 200,
    marginBottom: 350
}}>
  <View>
  <LinearGradient
    colors={['#000', '#FC0160']} 
    start={{ x: 0, y: 0 }} 
    end={{ x: 4, y: 0 }} 
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
    }}
  />
           
            <TextInput
                placeholder={'Enter your full name'}
                value={userInfo?.name}
                placeholderTextColor={'#FC0160'}
                style={{
                    fontFamily: 'Light',
                    borderWidth: 0.5,
                    borderColor: '#FC0160',
                    borderRadius: 20,
                    padding: 20,
                       color: '#fff'
                }}
            />
      </View>
      <View style={{
     
    
     
      }}>
      <LinearGradient
    colors={['#000', '#FC0160']} 
    start={{ x: 0, y: 0 }} 
    end={{ x: 4, y: 0 }} 
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 15,
    }}
  />
  <View style={{
       flexDirection: 'row',
       borderWidth: 0.5,
       borderColor: '#FC0160',
       borderRadius: 20,
       padding: 20,
       justifyContent: 'space-between'
  }}>
   <TextInput
                placeholder={'Select your date of birth'}
                placeholderTextColor={'#FC0160'}
                value={userInfo?.birth}
                style={{
                  fontFamily: 'Light',
                      color: '#fff'
                }}
             
            />
            <TouchableOpacity>
            <Calendar width={30} height={30} />
            </TouchableOpacity>

            </View>
      </View>

            
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
                    onPress={handleSend}
          style={{
            backgroundColor: "#fd0060",
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
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
