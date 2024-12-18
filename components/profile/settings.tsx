import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRef } from 'react';


export default function Settings({ }: any) {
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


    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#2A2A3C', padding: 5, gap: 18 }}>
      <View>
        <Text style={{
            fontFamily: 'Light',

        }}>
            SETTINGS
        </Text>
        <View>
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
fontFamily: 'Bold'
}}
>
Continue
</Text>
</TouchableOpacity>
  </Animated.View>
        </View>
      </View>
  </SafeAreaProvider>
    );
}
