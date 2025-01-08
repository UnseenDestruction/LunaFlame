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








import Calendar from '@/assets/images/horoscope/calendar.svg';


export default function BNav()  {



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


    return(
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10
          }}>
            <View style={{
              flexDirection: 'column',
            }}>
                  <Text style={{
              fontFamily: 'Bold',
              fontSize: 15,
              color: '#FFF',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             Sun
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             05
            </Text>
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
              fontSize: 15,
              color: '#FFF',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             Mon
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             06
            </Text>
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
              fontSize: 13,
              color: '#fff',
              opacity: 0.5,
              textAlign: 'center'
            }}>
              Tue
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.8,
              textAlign: 'center'
            }}>
             07
            </Text>
         
            </View>
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
            <View style={{
              flexDirection: 'column',
            }}>
                 <Text style={{
              fontFamily: 'Bold',
              fontSize: 13,
              color: '#fff',
              opacity: 0.5,
              textAlign: 'center'
            }}>
              Wed
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.8,
              textAlign: 'center'
            }}>
             08
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

            <View style={{
              flexDirection: 'column',
            }}>
                  <Text style={{
              fontFamily: 'Bold',
              fontSize: 13,
              color: '#B2AFFE',
              opacity: 0.5,
              textAlign: 'center'
            }}>
            Thu
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5
            }}>
             09
            </Text>
            </View>

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

            <View style={{
              flexDirection: 'column',
            }}>
                <Text style={{
              fontFamily: 'Bold',
              textAlign: 'center',
              fontSize: 13,
              color: '#B2AFFE',
              opacity: 0.5,
            }}>
             Fri
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             10
            </Text>
            </View>
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
            <View style={{
              flexDirection: 'column',
            }}>
                <Text style={{
              fontFamily: 'Bold',
              textAlign: 'center',
              fontSize: 13,
              color: '#B2AFFE',
              opacity: 0.5,
            }}>
             Sat
            </Text>
            <Text style={{
              fontFamily: 'Bold',
              fontSize: 18,
              color: '#B2AFFE',
              opacity: 0.5,
              textAlign: 'center'
            }}>
             11
            </Text>
            </View>




          </View>
    )

}




