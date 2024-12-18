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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { GuidanceStackParamList } from '@/app/tabs/MainGuidance';
import Prof from '@/app/tabs/profile/prof';


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



export default function Info({ userData,  info,  }: any) {
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);

  const navigation = useNavigation<NavigationProp<GuidanceStackParamList>>();


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        for (let i = 1; i <= 10; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          setProgress(i * 10); 
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



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
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#FFC2D9', fontSize: 20 }}>{info.Name}</Text>
          <View>
            <View style={{ flexDirection: 'row', opacity: 0.8, marginTop: 10 }}>
              <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center' }}>{userData.dob}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 10, height: 10 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
              </View>
              <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center' }}>{userData.tob}</Text>
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
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5}}>
            <Text style={{ fontFamily: 'Bold', color: '#fff', textAlign: 'center', fontSize: 15, opacity: 0.5 }}>
              Sun sign: 
            </Text>
            <Text style={{
                color: '#E47676',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Bold',
              }}>{info.SunSign}</Text>
            </View>
          </View>
          
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 40
          }}>
            <View style={{
                flexDirection: 'row',
                gap: 100
            }}>
            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>
              <Ascendant width={50} height={50} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Ascendant}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Ascendant
                </Text>
              </View>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 4
            }}>
             
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Moon}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Moon Sign
                </Text>
              </View>
              <Moon width={50} height={50} />
            </View>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 140
            }}>
            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>
              <Element width={50} height={50} />
              <View style={{
                flexDirection: 'column'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {info.Element}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Element
                </Text>
              </View>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
                {userData.gender}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Popularity
                </Text>
              </View>
              <Male width={50} height={50} />
            </View>
            </View>
          </View>
          <View style={{ width: '100%', marginTop: 200 }}>
  {progress < 100 ? (
    <>
      <View
        style={{
          width: '100%',
          height: 8,
          backgroundColor: '#fff',
          borderRadius: 10,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <View
          style={{
            width: `${progress}%`, 
            height: '100%',
            backgroundColor: '#B2AFFE',
            borderRadius: 10,
            shadowColor: '#B2AFFE',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Bold',
            color: '#B2AFFE',
          }}
        >
          {progress}%
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Light',
            color: '#fff',
            opacity: 0.8,
          }}
        >
          Please wait a minute
        </Text>
      </View>
    </>
  ) : (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
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
  onPress={() => navigation.navigate('Nav')}
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
fontSize: 13,
fontFamily: 'Bold'
}}
>
Continue
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
  )}
</View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}





