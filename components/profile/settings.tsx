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
import { PanGestureHandler, State } from 'react-native-gesture-handler';


import Arrow from '@/assets/images/profile/right.svg'




export default function Settings({ setShowSettings }: { setShowSettings: (value: boolean) => void }) {
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

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
    

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 100) {
        setShowSettings(false);
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };
    



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
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#2A2A3C', padding: 10,  }}>
     <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleStateChange}>
     
     <Animated.View
          style={{
            transform: [{ translateY }],
            flex: 1,
          }}
        >
      <TouchableOpacity
       onPress={() => setShowSettings(false)}
      style={{
        backgroundColor: '#B2AFFE',
        height: 6,
        width: 50,
        borderRadius: 10,
        position: 'relative',
        left: '45%'
      }}/>
      <View style={{
        flexDirection: 'column',
        marginTop: 40
      }}>

  

        <Text style={{
            fontFamily: 'Light',  
          fontSize: 30,
          color: '#B2AFFE',
        }}>
            SETTINGS
        </Text>
        <View style={{
          marginTop: 30
        }}>
           <Animated.View
    style={{
      borderColor: "#B2AFFE52",
      borderWidth: 1,
borderRadius: 20,
      padding: 5,
      transform: [{ scale }],
    }}
  >
      <TouchableOpacity
style={{
backgroundColor: "#1b1d2b",
borderRadius: 20,
padding: 15,
alignItems: "center",
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'space-between',

}}
>
<Text
style={{
fontSize: 18,
fontFamily: 'Bold',
color: '#B2AFFE'
}}
>
Rate lunaflame
</Text>
<Arrow width={30} height={30}/>
</TouchableOpacity>
  </Animated.View>
  <Animated.View
    style={{
      borderColor: "#B2AFFE52",
      borderWidth: 1,
borderRadius: 20,
      padding: 5,
      transform: [{ scale }],
    }}
  >
      <TouchableOpacity
style={{
backgroundColor: "#1b1d2b",
borderRadius: 20,
padding: 15,
alignItems: "center",
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'space-between',

}}
>
<Text
style={{
fontSize: 18,
fontFamily: 'Bold',
color: '#B2AFFE'
}}
>
Follow on facebook
</Text>
<Arrow width={30} height={30}/>
</TouchableOpacity>
  </Animated.View>
        <Animated.View
    style={{
      borderColor: "#B2AFFE52",
      borderWidth: 1,
borderRadius: 20,
      padding: 5,
      transform: [{ scale }],
    }}
  >
      <TouchableOpacity
style={{
backgroundColor: "#1b1d2b",
borderRadius: 20,
padding: 15,
alignItems: "center",
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'space-between',

}}
>
<Text
style={{
fontSize: 18,
fontFamily: 'Bold',
color: '#B2AFFE'
}}
>
Get support
</Text>
<Arrow width={30} height={30}/>
</TouchableOpacity>
  </Animated.View>
        </View>

        <View style={{
          flexDirection: 'column',
          marginTop: 20,
        }}>
        <Text style={{
            fontFamily: 'Light',  
          fontSize: 20,
          color: '#B2AFFE',
          marginBottom: 10
        }}>
          NOTIFICATIONS
        </Text>
        <Animated.View
    style={{
      borderColor: "#B2AFFE52",
      borderWidth: 1,
borderRadius: 20,
      padding: 5,
      transform: [{ scale }],
    }}
  >
      <TouchableOpacity
style={{
backgroundColor: "#1b1d2b",
borderRadius: 20,
padding: 15,
alignItems: "center",
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'space-between',

}}
>
<Text
style={{
fontSize: 18,
fontFamily: 'Bold',
color: '#B2AFFE'
}}
>
Allow notifications
</Text>
<Arrow width={30} height={30}/>
</TouchableOpacity>
  </Animated.View>
        </View>

        <View style={{
          flexDirection: 'column',
          marginTop: 20,
        }}>
        <Text style={{
            fontFamily: 'Light',  
          fontSize: 20,
          color: '#B2AFFE',
          marginBottom: 10
        }}>
         ACCOUNT
        </Text>
        <Animated.View
    style={{
      borderColor: "#B2AFFE52",
      borderWidth: 1,
borderRadius: 20,
      padding: 5,
      transform: [{ scale }],
    }}
  >
      <TouchableOpacity
style={{
backgroundColor: "#1b1d2b",
borderRadius: 20,
padding: 15,
alignItems: "center",
shadowColor: "#000",
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.25,
shadowRadius: 4.65,
elevation: 8,
flexDirection: 'row',
justifyContent: 'space-between',

}}
>
<Text
style={{
fontSize: 18,
fontFamily: 'Bold',
color: '#B2AFFE'
}}
>
Delete account
</Text>
<Arrow width={30} height={30}/>
</TouchableOpacity>
  </Animated.View>
        </View>
        </View>
        </Animated.View>
        </PanGestureHandler>
  </SafeAreaProvider>
    );
}
