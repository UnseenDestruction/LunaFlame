import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator,  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ReadingsParamList } from '../Mreadings';
import Number from '@/assets/images/numerology/number.svg'

import Dream from '../guidance/dream';


import Birth from '@/assets/images/readings/birth/symbols.svg';
import Plus from '@/assets/images/compatibility/birth/plus.svg';
import RedPlus from '@/assets/images/compatibility/birth/redPlus.svg';
import Leo from '@/assets/images/zodiac/leo.svg';
import Cancer from '@/assets/images/zodiac/cancer.png';







export default function Compatibility() {
    const navigation = useNavigation<NavigationProp<ReadingsParamList>>();

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
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000', padding: 5, gap: 18 }}>
             <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>COMPATIBILITY</Text>
             <TouchableOpacity
style={{ 
  borderRadius: 15,
  overflow: 'hidden', 
  width: '100%', 
  height: 200,
 borderColor: '#B2AFFE',
 borderWidth: 0.3
     }}>
       
 
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
     shadowColor: '#000',
     shadowOpacity: 0.3,
     shadowRadius: 15,
     shadowOffset: { width: 0, height: 10 },
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     gap: 4,
  }}>
    <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
    <Birth height={100}  />
    <Plus height={100}  />
    <Birth height={100}  />
    </View>
 
    <View>
      <Text style={{
 fontFamily: 'Bold', 
 color: '#B8A9FF',
 textShadowColor: 'rgba(184, 169, 255, 0.8)',
 textShadowOffset: { width: 0, height: 0 }, 
 textShadowRadius: 15,
 fontSize: 24
        }}>Birth Charts Compatibility</Text>
      <Text style={{fontFamily: 'Light', color: '#B2AFFE', width: 300}}>Let’s see what planets in your charts 
        say about your love match</Text>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity
style={{ 
  borderRadius: 15,
  overflow: 'hidden', 
  width: '100%', 
  height: 200,
 borderColor: '#B2AFFE',
 borderWidth: 0.3
     }}>
       
 
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
     shadowColor: '#000',
     shadowOpacity: 0.3,
     shadowRadius: 15,
     shadowOffset: { width: 0, height: 10 },
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
     gap: 4,
  }}>
    <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        bottom: 40 
    }}>
    <Leo height={100}  />
    <RedPlus height={100}  />
    <Image 
    source={Cancer}
    style={{
        position: 'relative',
        bottom: 40,
        height: 180,
        width: '20%'
    }}
    />
    </View>
 
    <View
    style={{
        position: 'relative',
        bottom: 70
    }}
    >
      <Text style={{
 fontFamily: 'Bold', 
 color: '#B8A9FF',
 textShadowColor: 'rgba(184, 169, 255, 0.8)',
 textShadowOffset: { width: 0, height: 0 }, 
 textShadowRadius: 15,
 fontSize: 24
        }}>Zodiac Sign Compatibility</Text>
      <Text style={{fontFamily: 'Light', color: '#B2AFFE', width: 300}}>304 Reports delivered today</Text>
    </View>
  </View>
</TouchableOpacity>

        </SafeAreaProvider>
    );
}
