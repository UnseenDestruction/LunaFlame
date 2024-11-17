import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';




export default function Auth({ navigation }: any) {
    const { colorScheme } = useColorScheme();

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        Bold: require("@/assets/fonts/Semibold.ttf"),
      });
    

    const Logo = require("@/assets/images/logo.png");


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
                      source={Logo}
                      style={{ width: '100%', height: 500 }}
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: 50,
                        marginBottom: 10,
                        textShadowColor: "#B2AFFE",
                        textShadowRadius: 5,
                        fontFamily: "Medium",
                        textShadowOffset: { width: 0, height: 0 },
                        opacity: 0.9,
                        textAlign: 'center'
                    }}
                    >
                        WELCOME
                    </Text>

                    <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        marginBottom: 10,
                        textShadowColor: "#B2AFFE",
                        textShadowRadius: 5,
                        fontFamily: "Medium",
                        textAlign: 'center',
                        textShadowOffset: { width: 0, height: 0 },
                        opacity: 0.9,
                    }}
                    >
                    You are on the path to discovering yourself. LunaFlame will help you live in harmony with the Universe.
                    </Text>
            <TouchableOpacity
                 onPress={() => navigation.navigate('Nav')}
                 style={{
                    backgroundColor: "#B2AFFE",
                    borderRadius: 999,
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4.65,
                    width: '60%',
                    elevation: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
            >
                <Text
                  
                >
                GET STARTED
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                 onPress={() => navigation.navigate('Nav')}
                 style={{
                    backgroundColor: "#B2AFFE",
                    borderRadius: 999,
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4.65,
                    width: '60%',
                    elevation: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10
                  }}
            >
                <Text>
               Already have an account
                </Text>
            </TouchableOpacity>
            </View>
    </SafeAreaView>
    );
}
