import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRef, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';


import Balls from '@/assets/images/auth/balls.gif';
import Cancer from '@/assets/images/zodiac/cancer.png';





export default function DOB({
    dob,
    setDob,
    goNext
}: any) {
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);



    console.log(dob)

    const [loaded] = useFonts({
        Light: require('@/assets/fonts/Light.ttf'),
        Regular: require('@/assets/fonts/Regular.ttf'),
        Medium: require('@/assets/fonts/Medium.ttf'),
        Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
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
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaProvider>
    );
  }

    return (
        <SafeAreaProvider style={{
            }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
     <SafeAreaView style={{
        flex: 1,
        flexDirection: 'column',
        gap: 10

     }}>
        <Text
        style={{
            fontFamily: 'Light',
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
            opacity: 10
        }}
        >
       Date is important for determining your sun sign, numerology and compatibility.
        </Text>
        <View>
        <Image
                source={Balls}
                style={{ width: 400, height: 300 }}
                resizeMode={ResizeMode.COVER}
              />
 <Image
                source={Cancer}
                style={{ width: 200, height: 200, position: 'absolute',
                    left: '25%',
                    top: '-5%',
                 }}
                resizeMode={ResizeMode.COVER}
              />
        </View>


        <DateTimePicker
       mode='date'
          value={date}
          display='spinner'
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate); 
            setDob(currentDate.toISOString().split('T')[0]);
        }}
          style={{
           position: 'relative',
           left: '10%',
           flex: 1,
           top: '-2%'
          }}
        />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    top: '-5%'
                }}>
                <Animated.View style={{    borderColor: '#B2AFFE52',
                            borderWidth: 1, borderRadius: 9999, padding: 5, transform: [{ scale }] }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'rgba(178, 175, 254, 0.5)',
                            borderRadius: 999,
                            paddingVertical: 12,
                            paddingHorizontal: 70,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                          onPress={() => goNext(setDob(""))}
                        >
                          <Text style={{ color: '#fff', fontSize: 13,  fontFamily: 'Bold' }}>SKIP</Text>
                        </TouchableOpacity>
                      </Animated.View>




                <Animated.View style={{    borderColor: '#B2AFFE52',
                            borderWidth: 1, borderRadius: 9999, padding: 5, transform: [{ scale }] }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#B2AFFE',
                            borderRadius: 999,
                            paddingVertical: 12,
                            paddingHorizontal: 70,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                          onPress={goNext}
                        >
                          <Text style={{ color: '#000', fontSize: 13,  fontFamily: 'Bold' }}>NEXT</Text>
                        </TouchableOpacity>
                      </Animated.View>
                </View>
                       
        </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </SafeAreaProvider>
    )
}



