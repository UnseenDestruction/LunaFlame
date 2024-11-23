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


import Palm from '@/assets/images/readings/palm/palm.svg';
import Birth from '@/assets/images/readings/birth/symbols.svg';
import Card from '@/assets/images/readings/card/card.svg';
import Cards from '@/assets/images/readings/card/cards.png';
import Card1 from '@/assets/images/readings/card/card1.svg';
import Card2 from '@/assets/images/readings/card/card2.svg';





export default function Readings() {
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
             <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>READINGS</Text>
             <TouchableOpacity
  onPress={() => navigation.navigate('Palm')}
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
    <Palm width={'100%'} height={100} style={{position: 'relative', right: 140}} />
    <View>
      <Text style={{
 fontFamily: 'Bold', 
 color: '#B8A9FF',
 textShadowColor: 'rgba(184, 169, 255, 0.8)',
 textShadowOffset: { width: 0, height: 0 }, 
 textShadowRadius: 15,
 fontSize: 24
        }}>Palm Reading</Text>
      <Text style={{fontFamily: 'Light', color: '#B2AFFE'}}>Read your palm to know your fortune</Text>
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
    <Birth width={'100%'} height={100} style={{position: 'relative', right: 140}} />
    <View>
      <Text style={{
 fontFamily: 'Bold', 
 color: '#B8A9FF',
 textShadowColor: 'rgba(184, 169, 255, 0.8)',
 textShadowOffset: { width: 0, height: 0 }, 
 textShadowRadius: 15,
 fontSize: 24
        }}>Birth Chart Reading</Text>
      <Text style={{fontFamily: 'Light', color: '#B2AFFE'}}>Learn more about your birth chart</Text>
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
      position: 'relative', 
      left: 50
    }}>
   
   
<Image source={Cards}  
style={{
  position: 'relative', 
  right: 50,
  height: 80,
  width: 80
}} 
/>



 
    </View>


    <View>
      <Text style={{
 fontFamily: 'Bold', 
 color: '#B8A9FF',
 textShadowColor: 'rgba(184, 169, 255, 0.8)',
 textShadowOffset: { width: 0, height: 0 }, 
 textShadowRadius: 15,
 fontSize: 24
        }}>Tarrot Card Reading</Text>
      <Text style={{fontFamily: 'Light', color: '#B2AFFE'}}>Learn more about your card readings</Text>
    </View>
  </View>
</TouchableOpacity>
        </SafeAreaProvider>
    );
}
