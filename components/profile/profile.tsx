import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator,  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Number from '@/assets/images/numerology/number.svg'


import Settings from '@/assets/images/profile/settings.svg';
import Logo from '@/assets/images/logo.svg';



export default function Profile({ userData,  info,}: any) {
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

      console.log("here is the user data for profile:", userData)
      console.log("here is the data for astrology", info)



    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000', padding: 5, gap: 18 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>PROFILE</Text>
            
            <View style={{
                borderWidth: 2,
                borderColor: '#B2AFFE',
                borderRadius: 999,
                padding: 5
            }}>
            <Settings width={30} height={30}/>
            </View>
            </View>
            <View style={{
                flexDirection: 'row',

            }}>
            <Logo width={50} height={50} />
            <View>
            <Text style={{ color: '#FFC2D9', fontSize: 20 }}>{info.Name}</Text>
          <View>
            <View style={{ flexDirection: 'row', opacity: 0.8, marginTop: 10 }}>
              <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center' }}>{userData.dob}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 10, height: 10 }} />
                <View style={{ backgroundColor: '#FFC2D9', borderRadius: 9999, width: 4, height: 4 }} />
              </View>
              <Text style={{ color: '#FFC2D9', fontSize: 14, textAlign: 'center' }}>{userData.tob}</Text>
            </View>
          </View>
            </View>

            </View>

        </SafeAreaProvider>
    );
}
