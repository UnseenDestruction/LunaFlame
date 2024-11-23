import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { GuidanceStackParamList } from '@/app/tabs/MainGuidance';
import Number from '@/assets/images/numerology/number.svg'
import DreamStars from '@/assets/images/Dream/dreamStars.mp4';


export default function Guidance() {
    const navigation = useNavigation<NavigationProp<GuidanceStackParamList>>();

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
             <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>GUIDANCE</Text>
<TouchableOpacity
  onPress={() => navigation.navigate('Analyze')}
  style={{
    borderRadius: 15,
    overflow: 'hidden',
    padding: 24,
    shadowColor: '#000',
    height: 200,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 4,
    borderColor: '#FFD774',
    borderWidth: 0.3
  }}
>
<LinearGradient
    colors={['#000', '#FFD774']} 
    start={{ x: 0, y: 0 }} 
    end={{ x: 4, y: 0 }} 
    style={{
      position: 'absolute',
      width: '120%',
      height: '140%',
      borderRadius: 15,
    }}
  />
  <Video
    source={require('@/assets/images/crystal/crystal.mov')}
    style={{ width: '100%', height: 100, position: 'relative', right: 138 }}
    shouldPlay
    isLooping
    isMuted
  />
  <Text style={{ 
      fontFamily: 'Bold', 
      color: '#FFD854',
      textShadowColor: 'rgba(184, 169, 255, 0.8)',
      textShadowOffset: { width: 0, height: 0 }, 
      textShadowRadius: 15,
      fontSize: 24
   }}>
    Crystal Ball
  </Text>
  <Text style={{ fontFamily: 'Light', color: '#FFD854' }}>
    Seek wisdom and ask anything to learn
  </Text>
</TouchableOpacity>

           
<TouchableOpacity
     onPress={() => navigation.navigate('Result')}
style={{ 
    borderRadius: 15, overflow: 'hidden', width: '100%', height: 200,  borderColor: '#FC016066',
    borderWidth: 0.8
     }}>
       
 
  <LinearGradient
    colors={['#FC016066', '#FC016029']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 0 }}
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  />
  <View style={{
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
   
  }}>
    <Number width={'100%'} height={100} style={{position: 'relative', right: 140}} />
    <View>
      <Text style={{
        fontFamily: 'Bold', 
        color: '#FC0160', 
        textShadowColor: 'rgba(184, 169, 255, 0.8)',
        textShadowOffset: { width: 0, height: 0 }, 
        textShadowRadius: 15,
        fontSize: 24}}>Numerology</Text>
      <Text style={{fontFamily: 'Light', color: '#FC0160'}}>304 Reports delivered today</Text>
    </View>
  </View>
</TouchableOpacity>
<TouchableOpacity
onPress={() => navigation.navigate('Dream')}
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
     width: '100%', 
     height: 200,
    borderColor: '#B2AFFE',
    borderWidth: 0.3
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
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 15,
            shadowOffset: { width: 0, height: 10 },
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 4,
    }}>
  <Video
    source={DreamStars}
    style={{
        position: 'absolute', 
        top: -470,
        left: -95,
      width: '160%',
      height: 720,
    }}
    shouldPlay
    isLooping
    isMuted
  />
  <View style={{ zIndex: 1,   padding: 12, position: 'relative', top: 100  }}>
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   textShadowColor: 'rgba(184, 169, 255, 0.8)',
   textShadowOffset: { width: 0, height: 0 }, 
   textShadowRadius: 15,
   fontSize: 24
     }}>Dream Explain</Text>
    <Text style={{ fontFamily: 'Light', color: '#B2AFFE' }}>Let Luna explain your dream</Text>
  </View>
  </View>
</TouchableOpacity>
        </SafeAreaProvider>
    );
}
