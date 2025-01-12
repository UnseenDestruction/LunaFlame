import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated, Modal  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ReadingsParamList } from '../Mreadings';
import { useRef } from 'react';

import { supabase } from '@/lib/supabase';

import Settings from '@/components/profile/settings';


import Settings1 from '@/assets/images/profile/settings.svg';
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






export default function Prof({ userData,  info,}: any) {
    const navigation = useNavigation<NavigationProp<ReadingsParamList>>();
    const scale = useRef(new Animated.Value(1)).current;
    const [isLoading, setLoading] = useState(false)
    const [profData, setProfData] = useState<any>([]);
    const [showSettings, setShowSettings] = useState(false)


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



    const getDate = (date: any) => {
      if (!date) return "Invalid Date"; 
      const parsedDate = new Date(date); 
      if (isNaN(parsedDate.getTime())) return "Invalid Date"; 
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }; // Include the year
      return parsedDate.toLocaleDateString('en-US', options);
    };
    


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
            
          setProfData(data)
          console.log("here is the data:", data)
          if (error) throw error;
        } catch (error: any) {
          console.error('Error fetching data from Supabase:', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userData]);
    

const dob = profData.birth

const handleClick = () => {
  setShowSettings(true)
}

console.log(showSettings)

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
      
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000',  }}>
        {showSettings ? 
        <Settings setShowSettings={setShowSettings}/>
        : (

<SafeAreaProvider style={{ flex: 1, backgroundColor: '#000', padding: 5, gap: 18 }}>

          <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
      }}>
      <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>PROFILE</Text>
      <TouchableOpacity
      onPress={handleClick}
      
      style={{
          borderWidth: 2,
          borderColor: '#B2AFFE',
          borderRadius: 999,
          padding: 5
      }}>
      <Settings1 width={20} height={20}/>
      </TouchableOpacity>
      </View>
      <View style={{
            flexDirection: 'column',
      }}> 

      
      <View style={{
        flexDirection: 'column',
        padding: 10
      }}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'

      }}>
      <Logo width={100} height={100} />
      <View>
      <Text style={{ color: '#FFC2D9', fontSize: 20 }}>{profData.name}</Text>
    <View>
      <View style={{ flexDirection: 'row', opacity: 0.8, marginTop: 10, gap: 10 }}>
        <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center', fontFamily: 'Bold' }}>{getDate(dob)}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
          <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 10, height: 10 }} />
          <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
        </View>
        <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center', fontFamily: 'Bold' }}>N/A</Text>
      </View>
    </View>
      </View>
     
      </View>
      <Animated.View
    style={{
      borderColor: "#B23030",
      borderWidth: 0.7,
      opacity: 0.7,
      borderRadius: 999,
      padding: 5,
      transform: [{ scale }],
  
    }}
  >
   
      <TouchableOpacity
  // onPress={() => navigation.navigate('Nav')}
style={{
borderRadius: 999,
alignItems: "center",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'center',
}}
>
<Pencil width={30} height={30}/>
<Text
style={{
fontSize: 13,
fontFamily: 'Bold',
color: '#B23030'
}}
>
Edit
</Text>


</TouchableOpacity>
  </Animated.View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Image 
                source={Cancer} 
                style={{ width: 200, height: 200 }} 
                resizeMode={ResizeMode.COVER} 
              />
 <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5}}>
            <Text style={{ fontFamily: 'Bold', color: '#fff', textAlign: 'center', fontSize: 15, opacity: 0.5 }}>
              Sun sign: 
            </Text>
            <Text style={{
                color: '#E47676',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Bold',
              }}>{profData.sun_sign}</Text>
            </View>
        </View>
      </View>

      <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 10
          }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20
            }}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 20,
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
                fontSize: 18,
                
              }}>
               {profData.ascendant}
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
                gap: 4,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 20,
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
               {profData.moon_sign}
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
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30
             
            }}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 20,
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
                {profData.element}
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
                gap: 10,
                borderColor: '#B2AFFE',
                borderWidth: 0.3,
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 20,
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
              Male
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
          <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                borderColor: '#FFD854',
                borderWidth: 0.3,
                borderRadius: 20,
                padding: 10
            }}>
               <Coin width={50} height={50} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
              <Text style={{
                color: '#FFD854',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
               Donate now
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#FFD854',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}>Help us keep serving for free
                </Text>
              </View>
             
            </View>
      </View>
      </SafeAreaProvider>
        )}

  </SafeAreaProvider>
    );
}
