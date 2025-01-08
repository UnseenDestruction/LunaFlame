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




import Arrow from '@/assets/images/horoscope/features/arrow.svg';
import ArrowYellow from '@/assets/images/horoscope/features/arrowyell.svg';
import Eclipse from '@/assets/images/horoscope/features/elipse.svg';



export function Features(){ 
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
            marginTop: 50,
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
           TODAY'S FEATURES
          </Text>
        
        <View style={{
            flexDirection: 'row',
            gap: 6
        }}>
        <View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#fff',
    borderWidth: 0.3,
    width: '32%'

  }}
>
<LinearGradient
    colors={['#000', '#B2AFFE']} 
    start={{ x: 0, y: 0}} 
    end={{ x: 4, y: 0 }} 
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
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
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 50
            
        }}>
        <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 28
     }}>29</Text>
       <Arrow width={30} height={30} />
            </View>
       
   
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 13, marginTop: 28, textAlign: 'center' }}>LUCKY NUMBER</Text>
    
  
    </View>
</View>


<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#E9AA17',
    borderWidth: 0.3,
       width: '32%'

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
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 40
            
        }}>
            <Eclipse width={40} height={40} />
       <ArrowYellow width={30} height={30} />
            </View>
       
   
    </View>

    <Text style={{ fontFamily: 'Light', color: '#E9AA17', fontSize: 13, marginTop: 28, textAlign: 'center' }}>LUCKY COLOR</Text>
    
  
    </View>
</View>

<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#E9AA17',
    borderWidth: 0.3,
       width: '33%'

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
        gap: 20
    }}>
        <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }}>
    <Text style={{ fontFamily: 'Bold', color: '#B2AFFE', fontSize: 15, marginTop: 10, textAlign: 'center' }}>7:20 am</Text>
    <Text style={{ fontFamily: 'Bold', color: '#B2AFFE', fontSize: 15, marginTop: 10, textAlign: 'center' }}>9: 42 am</Text>
            </View>
            <Arrow width={30} height={30} />
       
   
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15, marginTop: 10, textAlign: 'center' }}>LUCKY TIME</Text>
    
  
    </View>
</View>

        
        </View>
        
        </View>
    )
} 