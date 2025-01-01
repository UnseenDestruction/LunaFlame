import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated, Modal  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import Settings from '@/components/profile/settings';

import Glow from '@/assets/images/readings/card/glow.gif'
import IntroCard from '@/assets/images/readings/card/introCard.gif'


import Daily from '@/assets/images/readings/card/daily.svg'
import Love from '@/assets/images/readings/card/love.svg'
import Future from '@/assets/images/readings/card/future.svg'
import Yes from '@/assets/images/readings/card/yes.svg'
import  Card from '@/assets/images/readings/card/meanings.svg'






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






export default function Landing({ userData, navigation, info,}: any) {
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
    



    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
       Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
    });


    if (!loaded) {
        return (
          <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#B2AFFE" />
          </SafeAreaProvider>
        );
      }


    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000', padding: 5, gap: 18 }}>
     <LinearGradient
    colors={['#000', 'rgba(30,28,99,255)']} 
    start={{ x: 0, y: 0}} 
    end={{ x: 0, y: 1.1 }} 
    style={{
      position: 'absolute',
      width: '150%',
      height: '150%',
      borderRadius: 999,
    }}
  />
    
     <View
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
  <TouchableOpacity 
  onPress={() => navigation.navigate('Nav')}>
    <View
      style={{
        padding: 10,
        backgroundColor:  'rgba(50, 50, 50, 0.5)',
        borderRadius: 999,
      }}
    >
  <AntDesign
    name="left"
    size={24}
    color={'rgba(255, 255, 255, 0.5)'}
  />
    </View>
  </TouchableOpacity>
  <Text
    style={{
      color: '#B2AFFE',
      fontSize: 30,
      fontFamily: 'Light',
    }}
  >
   TARROT CARDS
  </Text>
</View>
      <View style={{
            flexDirection: 'column',
      }}> 

      
      <View style={{
        flexDirection: 'column',
        padding: 10
      }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Video
          source={require('@/assets/images/readings/card/intro.mov')}
          style={{ width: '150%', height: 300 }}
          shouldPlay
          isLooping
          isMuted
        />
        </View>
      </View>

      <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            padding: 10,
            marginTop: 30
          }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10
            }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Daily')}
            style={{
                flexDirection: 'column',
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                padding: 10,
                width: '50%',
                height: 100,
                borderRadius: 20,
            }}>
              <Daily width={50} height={50} />
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 16,
                
              }}>
               Daily Tarrot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Near')}
            
            
            style={{
                flexDirection: 'column',
                gap: 4,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                padding: 10,
                width: '50%',
                height: 100,
                borderRadius: 20,
            }}>
                 <Future width={50} height={50} />
          
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 16,
                
              }}>
              Near Future
              </Text>
            </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10
             
            }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Love')}
            
            style={{
                flexDirection: 'column',
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
               padding: 10,
               height: 100,
               width: '50%',
                borderRadius: 20,
            }}>
              <Love width={50} height={50} />
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 16,
                
              }}>
                Love & Relations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Yes')}
            
            style={{
                flexDirection: 'column',
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
               padding: 10,
               height: 100,
               width: '50%',
                borderRadius: 20,
            }}>
              <Yes width={50} height={50} />
           
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 16,
                
              }}>
               Yes or No
              </Text>
            
             
            </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
              onPress={() => navigation.navigate('Meanings')}
          
          style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                borderRadius: 20,
                padding: 15
            }}>
               <Card width={50} height={50} />
           <View 
           style={{
            justifyContent: 'center',
            alignItems:"center"
           }}>
           <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                textAlign: 'center'
                
              }}>
            Card Meanings
              </Text>
           </View>
            
            </TouchableOpacity>
      </View>
  </SafeAreaProvider>
    );
}
