import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ResizeMode } from 'expo-av';





import Ascendant from '@/assets/images/zodiac/symbol/zodSym.svg';
import Element from '@/assets/images/zodiac//symbol/triangle.svg';
import Moon from '@/assets/images/zodiac/symbol/zodiacSym2.svg';
import Polarity from '@/assets/images/zodiac/symbol/gender.svg';
import Male from '@/assets/images/auth/gender/male.svg';
import Cancer from '@/assets/images/zodiac/Cancer0.png'
import Plus from '@/assets/images/compatibility/zodiac/plus.svg'
import Leo from '@/assets/images/zodiac/Leo0.png'
import Aqua from '@/assets/images/zodiac/Aquarius0.png'




const zodiacImages: Record<string, any> = {
  Cancer: require('@/assets/images/zodiac/Cancer0.png'),
  Leo: require('@/assets/images/zodiac/Leo0.png'),
  Aquarius: require('@/assets/images/zodiac/Aquarius0.png'),
  Aries: require('@/assets/images/zodiac/Aries0.png'),
  Capricorn: require('@/assets/images/zodiac/Capricorn0.png'),
  Gemini: require('@/assets/images/zodiac/Gemini0.png'),
  Libra: require('@/assets/images/zodiac/Libra0.png'),
  Sagittarius: require('@/assets/images/zodiac/Sagittarius0.png'),
  Scorpio: require('@/assets/images/zodiac/Scorpio0.png'),
  Virgo: require('@/assets/images/zodiac/Virgo.png'),
  Pisces: require('@/assets/images/zodiac/Pisces0.png'),
};



export default function CompZodiac({ navigation,  onShowInstruction  }: any) {
    const { colorScheme } = useColorScheme();

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
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
          <SafeAreaProvider
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            <ActivityIndicator size="large" color="#B2AFFE" />
          </SafeAreaProvider>
        );
      }
    
    
    return (
        <SafeAreaView  style={{ backgroundColor: '#000', flex: 1 }}>
   
              <TouchableOpacity 
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

              onPress={() => navigation.navigate('Nav')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
                <Text style={{
                  fontFamily: 'Medium',
                  color: '#B2AFFE', 
                  fontSize: 27,  
                }}>
                 COMPATIBILITY REPORT
                </Text>
              </TouchableOpacity>



                <View style={{
                    flexDirection: 'column',
                    gap: 50

                }}>
                <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image 
                source={Cancer} 
                style={{ width: 150, height: 150 }} 
                resizeMode={ResizeMode.COVER} 
              />
                <Plus width={50} height={50} />
                <Image source={Leo} 
                  style={{ width: 150, height: 150 }} 
                  resizeMode={ResizeMode.COVER} 
                />
              </View>

              <View style={{
              }}>
                <Text
                style={{
                    fontFamily: 'Bold',
                    color: '#B2AFFE', 
                    fontSize: 27,
                    textAlign: 'center'  
                }}>
                SELECT A SIGN
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "center"

                }}>
                     <Image 
                source={Cancer} 
                style={{ width: 100, height: 100 }} 
                resizeMode={ResizeMode.COVER} 
                
              />
                <Image source={Leo} 
                  style={{ width: 200, height: 200 }} 
                  resizeMode={ResizeMode.COVER} 
                />
                  <Image source={Aqua} 
                  style={{ width: 100, height: 100 }} 
                  resizeMode={ResizeMode.COVER} 
                />
                </View>
              </View>
              <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18,
                      marginTop: 180
                    }}>
                       <View style={{
                      backgroundColor: '#B2AFFE',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                    <View style={{
                      backgroundColor: '#B2AFFE',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                  
                  
                    <Animated.View
                  style={{
                    borderColor: "#B2AFFE52",
                    borderWidth: 1,
                    borderRadius: 999,
                    padding: 5,
                    transform: [{ scale }],
                  }}
                >
                    <TouchableOpacity
                 onPress={onShowInstruction}
          style={{
            backgroundColor: "#B2AFFE",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 80,
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
      fontSize: 10,
      fontFamily: 'bold'
    }}
  >
   CHECK COMPABILITY
  </Text>
</TouchableOpacity>
                </Animated.View>
                <View style={{
                      backgroundColor: '#B2AFFE',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                <View style={{
                      backgroundColor: '#B2AFFE',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                </View>


                </View>
              
             
    </SafeAreaView>
    );
}
