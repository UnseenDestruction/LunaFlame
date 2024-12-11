import React, { useState, useRef, useEffect } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Animated, 
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { ResizeMode } from 'expo-av';


import Ascendant from '@/assets/images/zodiac/symbol/zodSym.svg';
import Element from '@/assets/images/zodiac//symbol/triangle.svg';
import Moon from '@/assets/images/zodiac/symbol/zodiacSym2.svg';
import Polarity from '@/assets/images/zodiac/symbol/gender.svg';
import Male from '@/assets/images/auth/gender/male.svg';

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

export default function Info({ userData, goNext, info }: any) {
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const [loaded] = useFonts({
    Light: require('@/assets/fonts/Light.ttf'),
    Regular: require('@/assets/fonts/Regular.ttf'),
    Medium: require('@/assets/fonts/Medium.ttf'),
    Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
  });

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

  const sunSignImage = zodiacImages[info.SunSign] || null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#FFC2D9', fontSize: 20 }}>{info.Name}</Text>
          <View>
            <View style={{ flexDirection: 'row', opacity: 0.8 }}>
              <Text style={{ color: '#FFC2D9', fontSize: 20, textAlign: 'center' }}>{userData.dob}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 10, height: 10 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
              </View>
              <Text style={{ color: '#FFC2D9', fontSize: 20, textAlign: 'center' }}>{userData.tob}</Text>
            </View>
          </View>

          <View>
            {sunSignImage && (
              <Image 
                source={sunSignImage} 
                style={{ width: 200, height: 200 }} 
                resizeMode={ResizeMode.COVER} 
              />
            )}
            <Text style={{ fontFamily: 'Bold', color: '#fff', textAlign: 'center', fontSize: 15, opacity: 1 }}>
              Sun sign: <Text style={{
                color: '#E47676',
                fontSize: 20
              }}>{info.SunSign}</Text>
            </Text>
          </View>
          
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20
          }}>
            <View style={{
                flexDirection: 'row',
                gap: 100
            }}>
            <View style={{
                flexDirection: 'row'
            }}>
              <Ascendant width={50} height={50} />
              <View style={{
                flexDirection: 'column'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Ascendant}
              </Text>
              <Text style={{
                    opacity: 20,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Ascendant
                </Text>
              </View>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
              <Ascendant width={50} height={50} />
              <View style={{
                flexDirection: 'column'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Ascendant}
              </Text>
              <Text style={{
                    opacity: 20,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Ascendant
                </Text>
              </View>
            </View>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 100
            }}>
            <View style={{
                flexDirection: 'row'
            }}>
              <Ascendant width={50} height={50} />
              <View style={{
                flexDirection: 'column'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Ascendant}
              </Text>
              <Text style={{
                    opacity: 20,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Ascendant
                </Text>
              </View>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
              <Ascendant width={50} height={50} />
              <View style={{
                flexDirection: 'column'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Ascendant}
              </Text>
              <Text style={{
                    opacity: 20,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Ascendant
                </Text>
              </View>
            </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}





