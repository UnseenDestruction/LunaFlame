import React, { useState, useEffect } from 'react';
import { AppState, Text, TouchableOpacity, View, SafeAreaView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated  } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { GuidanceStackParamList } from '@/app/tabs/MainGuidance';




import { supabase } from '@/lib/supabase';
import { signUpWithEmail } from '@/lib/auth';

type SignUpRequest = {
    name: string;
    dob: string;    
    tob: string;     
    lob: string;     
    gender: string;
    relation: string;
    email: string;
    password: string
  };
  
  type SignUpResponse = {
    status: 'success' | 'error';
    message: string;
    content?: string;
  };


const totalSteps = 6;

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});





export default function SignIn({ setMode }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState<{ content: string }>({ content: "" });
    const [name, setName] = useState('');

    const navigation = useNavigation<NavigationProp<GuidanceStackParamList>>();


    const handleNameChange = (text: string) => {
        setName(text);
    };


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
    

    return (
        <SafeAreaProvider style={{
            backgroundColor: '#000'
        }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
 <SafeAreaView style={{
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    marginTop: 100
 }}>
    <Text style={{
        color: '#fff',
        fontSize: 50,
        fontFamily: 'Bold',
        textAlign: 'center'
    }}>
        Sign In
    </Text>

<View style={{
    gap: 10,
}}>
<TextInput
              style={{
                borderRadius: 20,
                padding: 20,
                color: '#B2AFFE',
                fontFamily: 'Light',
                borderWidth: 0.3,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              placeholder="Enter Email Adress"
              placeholderTextColor="rgba(178, 175, 254, 0.8)"
              value={name}
              onChangeText={handleNameChange}
            />
            <TextInput
              style={{
                borderRadius: 20,
                padding: 20,
                color: '#B2AFFE',
                fontFamily: 'Light',
                borderWidth: 0.3,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
              placeholder="Enter Password"
              placeholderTextColor="rgba(178, 175, 254, 0.8)"
              value={name}
              onChangeText={handleNameChange}
            />
            </View>

                    <Animated.View style={{    borderColor: '#B2AFFE52',
                        borderWidth: 1, borderRadius: 9999, padding: 5, transform: [{ scale }] }}>
                    <TouchableOpacity
                  onPress={() => navigation.navigate('Nav')}

                        //  disabled={!name}
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
                    >
                      <Text style={{ color: '#000', fontSize: 13,  fontFamily: 'Bold' }}>Go In</Text>
                    </TouchableOpacity>
                  </Animated.View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  </SafeAreaProvider>
    );
}
