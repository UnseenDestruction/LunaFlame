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



import Logo from '@/assets/images/logo.svg';



export default function Auth({ navigation }: any) {
    const { colorScheme } = useColorScheme();

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/ChillaxSemibold.ttf"),
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
            <Logo width={250} height={250} style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              left: 80,
              top: 125,
              marginBottom: 280
            }} />

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <View style={{
                        position: 'relative',
                        bottom: 80

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
                        WELCOME
                    </Text>

                    <Text
                    style={{
                        color: "#B2AFFE",
                        fontSize: 15,
                        marginBottom: 10,
                        fontFamily: "Bold",
                        textAlign: 'center',
                        opacity: 0.9,
                    }}
                    >
                    You are on the path to discovering yourself. LunaFlame will help you live in harmony with the Universe.
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
      fontFamily: 'bold'
    }}
  >
    GET STARTED
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
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 10
                    }}>
                    <View style={{
                      backgroundColor: '#252376',
                      height: 5,
                      width: 180,
                    }}/>

                    <View style={{
                      backgroundColor: '#252376',
                      height: 15,
                      width: 15,
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
          style={{
            backgroundColor: "#252376",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 30,
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
      fontFamily: 'Medium',
      color: '#B2AFFE'
    }}
  >
    Already have an account
  </Text>
</TouchableOpacity>
                </Animated.View>
                <View style={{
                      backgroundColor: '#252376',
                      height: 15,
                      width: 15,
                      borderRadius: 9999
                    }}/>
            <View style={{
                      backgroundColor: '#252376',
                      height: 5,
                      width: 100,
                      borderRadius: 999
                    }}/>

                </View>
             </View>
    </SafeAreaView>
    );
}
