import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated, Modal, ScrollView  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Nav from './nav';
import NavM from './navm';





import Full from '@/assets/images/horoscope/lunar/full.png';
import Initial from '@/assets/images/horoscope/lunar/initial.png';
import Eclipse from '@/assets/images/horoscope/lunar/eclipse.png';
import Half from '@/assets/images/horoscope/lunar/half.png';
import FullEclpise from '@/assets/images/horoscope/lunar/fullEclpise.png';
import Check from '@/assets/images/horoscope/check.svg';
import Wrong from '@/assets/images/horoscope/lunar/wrong.svg';


export function Lunar(){ 
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

    return(
        <View style={{
            flexDirection: 'column',
            marginTop: 20,
            gap: 5
        }}>
        <Text
            style={{    
                color: "#B2AFFE",
                fontSize: 28,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}
          >
            LUNAR CALENDAR
          </Text>
        
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 5
            }}>
            <Image 
    source={Half} 
    style={{ 
      width: 150, 
      height: 150, 
    }} 
    resizeMode="cover" 
  />
  <View>
  <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 20,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
        
                marginBottom: 10
              }}>
              n/a
  </Text>
  <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
            
                marginBottom: 10
              }}>
                n/a
  </Text>
  <Text    
   style={{    
                color: "#FC0160",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
               
                marginBottom: 10
              }}>
                n/a
  </Text>
  </View>

            </View>
        </View>

        <View 
        style={{
            flexDirection: 'row',
            padding: 10,
            gap: 40,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                flexDirection: 'column',
                gap: 3
            }}>
            <Image 
    source={FullEclpise} 
    style={{ 
      width: 65, 
      height: 65, 
    }} 
    resizeMode="cover" 
  />
    <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}>
                SEPT 3
  </Text>
            </View>
            <View style={{
                flexDirection: 'column',
                gap: 3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image 
    source={Initial} 
    style={{ 
      width: 65, 
      height: 65, 
    }} 
    resizeMode="cover" 
  />
    <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}>
               SEPT 11
  </Text>
            </View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Image 
    source={Full} 
    style={{ 
      width: 65, 
      height: 65, 
    }} 
    resizeMode="cover" 
  />
    <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}>
               SEPT 19
  </Text>
            </View>

            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image 
    source={Eclipse} 
    style={{ 
      width: 65, 
      height: 65, 
    }} 
    resizeMode="cover" 
  />
    <Text    
   style={{    
                color: "#B2AFFE",
                fontSize: 15,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}>
               SEPT 25
  </Text>
            </View>

                
        </View>

        <View style={{
            flexDirection: 'column',
        }}>
        <View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#fff',
    borderWidth: 0.3,
    width: '100%',

  }}
>
<LinearGradient
    colors={['#000', '#B2AFFE']} 
    start={{ x: 0, y: 0}} 
    end={{ x: 4, y: 0 }} 
    style={{
      position: 'absolute',
      width: '120%',
      height: '140%',
      borderRadius: 15,
    }}
  />
<View style={{
    padding: 15,
    flexDirection: 'column',
    gap: 10
}}>
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        gap: 10
    }}>
        <Check width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 24
     }}>Do</Text>
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15 }}>A good time to change your image. All the most daring ideas will be successful.</Text>
    </View>
</View>


<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    width: '100%'
  }}
>

<View style={{
    padding: 15,
    flexDirection: 'column',
    gap: 10
}}>
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        gap: 10
    }}>
        <Wrong width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#fff',
   fontSize: 24
     }}>Don't</Text>
    </View>
    <Text style={{ fontFamily: 'Light', color: '#fff', fontSize: 15 }}>Most likely, money with the moon in Aquarius will be wasted. Prudence in finance is not your strong point.</Text>
    </View>



<View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18,
            marginTop: 10

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
                    borderColor: "#B2AFFE",
                    borderWidth: 0.3,
                    borderRadius: 999,
                    padding: 5,
                    transform: [{ scale }],
                  }}
                >
                    <TouchableOpacity
          style={{
            backgroundColor: "#B2AFFE",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 40,
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
    READ MORE
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
        </View>
        
        </View>
    )
} 