import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated, Modal, ScrollView  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ReadingsParamList } from '../Mreadings';
import { useRef } from 'react';

import Settings from '@/components/profile/settings';


import Calendar from '@/assets/images/horoscope/calendar.svg';
import Logo from '@/assets/images/logo.svg';
import Pencil from '@/assets/images/profile/pencil.svg';


import Cancer from '@/assets/images/zodiac/Cancer0.png'

import Ascendant from '@/assets/images/zodiac/symbol/zodSym.svg';
import Element from '@/assets/images/zodiac//symbol/triangle.svg';
import Moon from '@/assets/images/zodiac/symbol/zodiacSym2.svg';
import Polarity from '@/assets/images/zodiac/symbol/gender.svg';
import Male from '@/assets/images/auth/gender/male.svg';
import Coin from '@/assets/images/profile/coin.svg'



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






export default function Horoscope({ userData,  info,}: any) {
    const navigation = useNavigation<NavigationProp<ReadingsParamList>>();
    const scale = useRef(new Animated.Value(1)).current;

    console.log("here is the:", userData)
    console.log("here is the info:", info)

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
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000',  gap: 18 }}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5
      }}>
      <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>HOROSCOPE</Text>
      <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: '#B2AFFE',
          borderRadius: 999,
          padding: 8,
          flexDirection: 'row',
          gap: 5
      }}>
        <Text style={{
          color: '#B2AFFE',
          fontSize: 16,

        }}>
        DEC 21
        </Text>
      <Calendar width={20} height={20}/>
      </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ gap: 20,}}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'column',

        }}>
        <Text style={{
          fontFamily: 'Bold',
          fontSize: 18,
          color: '#B2AFFE',
          opacity: 0.8
        }}>
          TODAY
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}> 
        <View style={{
          backgroundColor: '#B2AFFE',
          height: 1,
          width: 20,
          borderRadius: 20
        }} />
         <View style={{
          backgroundColor: '#B2AFFE',
          height: 5,
          width: 5,
          borderRadius: 999
        }} />
         <View style={{
          backgroundColor: '#B2AFFE',
          height: 1,
          width: 20,
          borderRadius: 20
        }} />
        </View>
        </View>
        <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          opacity: 0.5
        }}> 
        <View style={{
          backgroundColor: '#B2AFFE',
          height: 1,
          width: 5,
          borderRadius: 999
        }} />
         <View style={{
          backgroundColor: '#B2AFFE',
          height: 7,
          width: 7,
          borderRadius: 999
        }} />
         <View style={{
          backgroundColor: '#B2AFFE',
          height: 1,
          width: 5,
          borderRadius: 999
        }} />
        </View>

        </View>

        <View style={{
          flexDirection: 'column',

        }}>
        <Text style={{
          fontFamily: 'Bold',
          fontSize: 18,
          color: '#B2AFFE',
          opacity: 0.5
        }}>
          TOMMOROW
        </Text>
        </View>
      </View>


<View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20
}}>

<View style={{
  gap: 10
}}>
<View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
               height: 'auto',
                borderRadius: 20,
            }}>
              <Ascendant width={40} height={40} />
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
               Test
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Sun Sign
                </Text>
              </View>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
               height: 'auto',
                borderRadius: 20,
            }}>
              <Ascendant width={40} height={40} />
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
               Test
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

  
</View>

<View style={{
  borderWidth: 0.5,
   borderColor: "#E47676",
   borderRadius: 999,
   paddingBottom: 40,
   width: 300,
   height: 300,
   position: 'absolute',
   top: 80
}}>

</View>

<View style={{
            flexDirection: 'column',
            width: '45%',
            position: 'relative',
            left: 10,
            borderWidth: 0.5,

     
      }}> 
      <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }}>
      
      <View style={{
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center'
      }}>
      <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', }}>Geric</Text>
    <View>
      <View style={{ flexDirection: 'row', opacity: 0.8, marginTop: 10, gap: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', opacity: 0.7, fontSize: 14, textAlign: 'center', fontFamily: 'Bold',  }}>You</Text>
          <View style={{ backgroundColor: '#fff', opacity: 0.8, borderRadius: 9999, width: 5, height: 5 }} />
        <Text style={{ color: '#fff', opacity: 0.7, fontSize: 14, textAlign: 'center', fontFamily: 'Bold' }}>2005-07-17</Text>
      </View>
    </View>
      </View>
      <Logo width={100} height={100} />
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: -20
      }}>
      <Image 
                source={Cancer} 
                style={{ width: 200, height: 200 }} 
                resizeMode={ResizeMode.COVER} 
              />
        </View>

      
   
      </View>


      <View>
<View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                padding: 10,
               height: 'auto',
                borderRadius: 20,
            }}>
              <Ascendant width={40} height={40} />
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
               Test
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Sun Sign
                </Text>
              </View>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                padding: 10,
               height: 'auto',
                borderRadius: 20,
            }}>
              <Ascendant width={40} height={40} />
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
               Test
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Sun Sign
                </Text>
              </View>
            </View>

  
</View>

</View>

            </ScrollView>
  </SafeAreaProvider>
    );
}
