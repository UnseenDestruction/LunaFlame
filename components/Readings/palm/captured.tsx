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


import Health from '@/assets/images/readings/palm/health.svg';
import Love from '@/assets/images/readings/palm/love.svg';
import Fate from '@/assets/images/readings/palm/fate.svg';
import Life from '@/assets/images/readings/palm/life.svg';
import Lines from '@/assets/images/readings/palm/lines.svg';





export default function Captured({ Image }: any) {
    const { colorScheme } = useColorScheme();

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
      });
    


      console.log(Image)
      

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
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            position: 'absolute',
          }}
          source={{ uri: Image }}
        />
        <Lines width={400} height={500} style={{
          marginBottom: 150,
          position: 'relative',
          top: 150

        }}/>

        <Animated.View style={{
             padding: 5,
             transform: [{ scale }],
             borderColor: '#B2AFFECC',
             flexDirection: 'row',

        }}>
            <Health  width={50} height={50}/>
          <Text style={{
            color: '#fff',
            fontFamily: 'Bold'
          }}>
            Health Line
          </Text>
        </Animated.View>
        <View style={{
             borderColor: "#B2AFFE52",
             borderWidth: 0.5,
        }}>
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
    View Result
  </Text>
</TouchableOpacity>
                </Animated.View>
                </View>
    </SafeAreaView>
    );
}
