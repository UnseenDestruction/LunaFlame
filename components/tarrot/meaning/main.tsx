import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ImageRes } from '@/lib/readings';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';



import Card from '@/assets/images/tarrot/TarotCards/card.svg';
import one from '@/assets/images/tarrot/TarotCards/1.gif';


const cardImages: Record<string, any> = {
    1: require('@/assets/images/tarrot/TarotCards/1.gif'),
    2: require('@/assets/images/tarrot/TarotCards/2.gif'),
    3: require('@/assets/images/tarrot/TarotCards/3.gif'),
    4: require('@/assets/images/tarrot/TarotCards/4.gif'),
    5: require('@/assets/images/tarrot/TarotCards/5.gif'),
    6: require('@/assets/images/tarrot/TarotCards/6.gif'),
    7: require('@/assets/images/tarrot/TarotCards/7.gif'),
    8: require('@/assets/images/tarrot/TarotCards/8.gif'),
    9: require('@/assets/images/tarrot/TarotCards/9.gif'),
    10: require('@/assets/images/tarrot/TarotCards/10.gif'),
    11: require('@/assets/images/tarrot/TarotCards/11.gif'),
    12: require('@/assets/images/tarrot/TarotCards/12.gif'),
    13: require('@/assets/images/tarrot/TarotCards/13.gif'),
    14: require('@/assets/images/tarrot/TarotCards/14.gif'),
    15: require('@/assets/images/tarrot/TarotCards/15.gif'),
    16: require('@/assets/images/tarrot/TarotCards/16.gif'),
    17: require('@/assets/images/tarrot/TarotCards/17.gif'),
    18: require('@/assets/images/tarrot/TarotCards/18.gif'),
    19: require('@/assets/images/tarrot/TarotCards/19.gif'),
    20: require('@/assets/images/tarrot/TarotCards/20.gif'),
    21: require('@/assets/images/tarrot/TarotCards/21.gif'),
    22: require('@/assets/images/tarrot/TarotCards/22.gif'),
    23: require('@/assets/images/tarrot/TarotCards/23.gif'),
    24: require('@/assets/images/tarrot/TarotCards/24.gif'),
  };




export default function TLResult({ navigation, cards }: any) {
    const { colorScheme } = useColorScheme();
    const [more, setIsMore] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [count, setCount] = useState(3)
    const [loading, setLoading] = useState(false)
    
    

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
      });
    
    const scale = useRef(new Animated.Value(1)).current;


    console.log("here are the result:", cards)
    console.log(navigation)


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




      const handleClick = () => {
        setIsClicked(true)
        setCount(count - 1)
      }

      const handleMore = () => {
        setIsMore(true)
      }
    
      console.log(isClicked)
      console.log(count)

    
    return (
        <SafeAreaView  style={{ backgroundColor: '#000', flex: 1 }}>
  <LinearGradient
    colors={['#000', 'rgba(23,22,77,255)']} 
    start={{ x: 0, y: 1}} 
    end={{ x: 0, y: 0 }} 
    style={{
      position: 'absolute',
      width: '150%',
      height: '150%',
    }}
  />
         
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
              onPress={() => navigation.navigate('Tarrot')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
                <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>CARD MEANINGS</Text>
              </TouchableOpacity>

              
   <View style={{
            marginTop: 30
          }}>
         <View style={{
          flexDirection: 'row',
         }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 100,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
             Major Arcana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 80,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
            Wands
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 80,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
            Cups
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 80,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
             Swords
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 80,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
            Pentacles
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 200,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }} >
             Major Arcana
            </Text>
          </TouchableOpacity>
         </View>
         </View>

         <ScrollView style={{
                  flexDirection: 'column',
                  marginTop: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>MAJOR ARCANA</Text>
                    <Text style={{ color: '#FFF', fontSize: 14,  fontFamily: 'Bold', opacity: 0.5  }}> {Object.keys(cardImages).length} cards</Text>

                    </View>

                    <View
    style={{
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    }}
  >
    {Object.entries(cardImages).map(([key, source]) => (
      <View
        key={key}
        style={{
          alignItems: 'center',
              borderWidth: 1,
            borderColor: 'rgba(47,47,95,255)',
            padding: 10
        }}
      >
        <Image
          source={source}
          style={{ width: 185, height: 300, borderRadius: 10,
        
           }}
          resizeMode="cover"
        />
      </View>
    ))}
  </View>

                  </ScrollView>
  
  
                        

              
    </SafeAreaView>
    );
}
  





