import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '@/app/tabs/guidance/dream';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Dream from '@/app/tabs/guidance/dream';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ImageRes } from '@/lib/readings';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';


import Readmore from '@/components/horoscope/readmore';




import { uploadImage } from '@/lib/storage';

import BNav from './nav';
import BNav1 from './navb';

import Calendar from '@/assets/images/horoscope/calendar.svg';
import Right from '@/assets/images/readings/birth/right.svg';



import Csun from '@/assets/images/readings/birth/Planets/Csun.png';
import Cmoon from '@/assets/images/readings/birth/Planets/Cmoon.png';
import Cjupiter from '@/assets/images/readings/birth/Planets/cjupiter.png';
import Cmars from '@/assets/images/readings/birth/Planets/cmars.png';
import CsunR from '@/assets/images/readings/birth/Planets/CsunR.png';
import CjupiterL from '@/assets/images/readings/birth/Planets/CjupiterR.png';
import CmoonR from '@/assets/images/readings/birth/Planets/CmoonR.png';









export default function MBirth({ navigation }: any) {
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
    

    const getDate = (date: any) => {
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };


    const today = new Date();


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
          <ScrollView>
          <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5
      }}>
        <View style={{flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4

        }}>
           <TouchableOpacity onPress={() => navigation.navigate('Nav', {screen: 'Nav', })}
            >
            <View
              style={{
                padding: 10,
                backgroundColor: "rgba(50, 50, 50, 1)",
                borderRadius: 999,
              }}
            >
              <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
            </View>
          </TouchableOpacity>
      <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>BIRTH CHART</Text>
      </View>
      <View style={{
          borderWidth: 1,
          borderColor: '#B2AFFE',
          borderRadius: 999,
          padding: 8,
          flexDirection: 'row',
          gap: 5
      }}>
        <Text style={{
          color: '#B2AFFE',
          fontSize: 16,

        }}>
      {getDate(today)}
        </Text>
      <Calendar width={20} height={20}/>
      </View>
      </View>
      <View style={{
        flexDirection: 'column',
        gap: 20,
        marginTop: 20
      }}>
      <BNav1 /> 
      <BNav />

      <View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
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
    flexDirection: 'column',
    gap: 10
}}>
<Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 20
     }}>Why shoud you care about</Text>
    <Text style={{ fontFamily: 'Light', color: '#B2AFFE' }}>Transits and aspects?</Text>
    </View>
    <Right width={30} height={30} />
</View>

<View style={{
  height: 1,
  width: '100%',
  backgroundColor: '#fff',
  opacity: 0.3
}}/>
<View style={{
            flexDirection: 'column',
            marginTop: 10,
            gap: 10,
        }}>
          <View style={{
            flexDirection: 'column',
            gap: 10
          }}>
        <Text
            style={{    
                color: "#fff",
                fontSize: 28,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}
          >
           YOUR SHORT TERM TRANSITS
          </Text>
        
          <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={Csun}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#FF910C",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Sun Trine
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={Cjupiter}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#E19358",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Your Jupiter
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={Cmoon}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Moon Square
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={Cjupiter}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#E19358",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Your Mercury
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={CjupiterL}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#FF910C",
            fontSize: 20,
            fontFamily: 'Bold', 
          }}
        >
           Mercury Conjuction
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={CmoonR}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
          Your Moon
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    </View>

<View>
<Text
            style={{    
                color: "#fff",
                fontSize: 28,
                fontFamily: 'Light',         
                textShadowOffset: { width: 0, height: 0 },
                textTransform: "uppercase",
                marginBottom: 10
              }}
          >
           YOUR LONG TERM TRANSITS
          </Text>

<View style={{
  flexDirection: 'column',
  gap: 10
}}>
          <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={CjupiterL}
   style={{ width: 200, height: 100, borderRadius: 10, position: 'relative', left: -10}}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#FF910C",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Mercury Sectile
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={Cjupiter}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#E19358",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
           Your Mercury
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={Cmars}
   style={{ width: 200, height: 100, borderRadius: 10, position: 'relative', left: -10}}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#FF910C",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Mars Sextile
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={CsunR}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#E19358",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Your Sun
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    <View 
                    style={{
                      height: 220,
                      borderWidth: 0.3,
                      borderColor: '#ffffff',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                      overflow: 'hidden'
                    }}>
    <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 10,
    }}>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image
   source={Cmars}
   style={{ width: 200, height: 100, borderRadius: 10, position: 'relative', left: -10}}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#FF910C",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Mars Sextile
        </Text>
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image
   source={CmoonR}
   style={{ width: 200, height: 100, borderRadius: 10 }}
   resizeMode="cover"
  />

      <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 25,
            fontFamily: 'Bold', 
          }}
        >
            Your Moon
        </Text>
        </View>
    </View>

    <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: 5
               }}>
                
        <Text
         style={{    
            color: "#fff",
            fontSize: 15,
            fontFamily: 'SemiBold', 
            textAlign: 'center',
          }}
        >
       During the sun trine your natal Jupiter transit, expect an abundance of opportunity...
        </Text>
          <Readmore />
       </View>
                    </View>
                    </View>

                    </View>

        </View>


      </View>

  
      </ScrollView> 
    </SafeAreaView>
    );
}
  





