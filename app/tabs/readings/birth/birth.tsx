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




import Palm from '@/assets/images/readings/palm/palm.svg';
import Elipse from '@/assets/images/readings/palm/elipse.png';




export default function Birth({ navigation,  onShowInstruction  }: any) {
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
                  fontFamily: 'Light',
                }}>
                  PALM READING
                </Text>
              </TouchableOpacity>
              <Image 
              source={Elipse}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderColor: '#FFF',
                left: 110,
                top: 10,
                width: 200,
                height: 200,
              }}
              />
            <Palm width={400} height={400} style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginBottom: 150,
              top: 40,
              left: 20
            }} />

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            position: 'relative',
                            top: -120

                        }}>
                    <Text
                    style={{
                        color: "#B2AFFE",
                        fontSize: 50,
                        marginBottom: 10,
                        textShadowColor: "#B2AFFE",
                        textShadowRadius: 5,
                        fontFamily: "SemiBold",
                        textShadowOffset: { width: 0, height: 0 },
                        opacity: 0.9,
                        textAlign: 'center'
                    }}
                    >
                        Palm Reading
                    </Text>

                    <Text
                    style={{
                        color: "#B2AFFE",
                        fontSize: 15,
                        marginBottom: 10,
                        fontFamily: "Medium",
                        textAlign: 'center',
                        opacity: 0.9,
                    }}
                    >
                        Read your palm to know your future
                    </Text>
                    </View>
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
      fontSize: 13,
      fontFamily: 'bold'
    }}
  >
    READ NOW
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
