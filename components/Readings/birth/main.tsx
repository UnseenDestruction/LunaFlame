import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ImageRes } from '@/lib/readings';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';


import { uploadImage } from '@/lib/storage';



import Palm from '@/assets/images/readings/palm/palm.svg';
import Hand from '@/assets/images/readings/palm/hand.svg';
import Hand1 from '@/assets/images/readings/palm/hand1.svg';
import Hand2 from '@/assets/images/readings/palm/hand2.svg';
import Scanner from '@/assets/images/readings/palm/scanner.svg';
import Lines from '@/assets/images/readings/palm/lines.svg';



export default function Instruction({ navigation }: any) {
    const { colorScheme } = useColorScheme();
    const [loading, setLoading] = useState(false)
     const [assistantResponse, setAssistantResponse] = useState<{
      status?: string;
      message?: string;
      analysis?: {
        overview?: {
          percentages?: Record<string, number>;
          summary?: string;
        };
        visionAnalysis?: Record<string, any>;
        detailedInsights?: string;
        career?: {
          description?: string;
        };
        characteristics?: {
          strengths?: string[];
          weaknesses?: string[];
          personality?: string;
        };
      };
    }>({});
    

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
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
              <TouchableOpacity 
              style={{
                overflow: 'hidden',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
                borderRadius: 10,
                padding: 10,
                paddingVertical: 10,
              }}
              onPress={() => navigation.navigate('Nav')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
                <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>PALM READING</Text>
              </TouchableOpacity>
          <View style={{
            marginTop: 30
          }}>
         <View style={{
          flexDirection: 'row',
          
         }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 200,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 18,  fontFamily: 'Light',
            }} >
              Your Hand
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <View style={{
               backgroundColor: '#B2AFFE',
               width: 200,
               height: 1
            }} />
            <Text style={{
               color: '#B2AFFE', fontSize: 18,  fontFamily: 'Light',
            }} >
             Today's Fortune
            </Text>
          </TouchableOpacity>
         </View>
         <Text style={{
             color: '#FFF', fontSize: 15,  fontFamily: 'Light',
             textAlign: 'center',
             marginTop: 30,
             opacity: 0.7,
             padding: 10
         }}>
         Scab your hands in <Text style={{ color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
             textAlign: 'center',
             }}>three steps</Text> to get reports that covers all areas of life.
         </Text>
         </View>
         <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
         }}>
          <View style={{
            opacity: 1
          }}>
         <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            borderColor: '#B2AFFE',
            borderWidth: 0.5,
            padding: 10,
            width: 130,
            borderRadius: 12,
            position: 'relative',
            right: 10
          }}>
            <Hand width={50} height={50}/>
            <Text style={{
               color: '#B2AFFE', fontSize: 18,  fontFamily: 'Bold',
            }} >
              1ST STEP
            </Text>
            <Text style={{
                color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }}>
              Left Hand
            </Text>
          </TouchableOpacity>
          </View>
          <View style={{
            opacity: 0.5
          }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
            width: 150,
      
          }}>
            <Hand1 width={50} height={50}/>
            <Text style={{
               color: '#B2AFFE', fontSize: 18,  fontFamily: 'Bold',
            }} >
              2ND STEP
            </Text>
            <Text style={{
                color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }}>
              Right Hand
            </Text>
          </TouchableOpacity>
          </View>
          <View style={{
            opacity: 0.5
          }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
            width: 140
          }}>
            <Hand2 width={50} height={50}/>
            <Text style={{
               color: '#B2AFFE', fontSize: 18,  fontFamily: 'Bold',
            }} >
              3RD STEP
            </Text>
            <Text style={{
                color: '#B2AFFE', fontSize: 15,  fontFamily: 'Light',
            }}>
            Fingers
            </Text>
          </TouchableOpacity>
          </View>
         </View>
    </SafeAreaView>
    );
}
  





