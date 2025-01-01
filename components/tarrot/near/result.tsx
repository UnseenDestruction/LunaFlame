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
import { ResizeMode } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';



import Card from '@/assets/images/tarrot/TarotCards/card.svg';
import one from '@/assets/images/tarrot/TarotCards/1.gif';


const cardImages: Record<string, any> = {
    1: require('@/assets/images/tarrot/TarotCards/1.gif'),
    2: require('@/assets/images/tarrot/TarotCards/2.gif'),
    3: require('@/assets/images/tarrot/TarotCards/3.gif'),
    4: require('@/assets/images/tarrot/TarotCards/4.gif'),
    5: require('@/assets/images/tarrot/TarotCards/5.gif'),
    6: require('@/assets/images/tarrot/TarotCards/6.gif'),
    7: require('@/assets/images/tarrot/TarotCards/7.gif'),
    8: require('@/assets/images/tarrot/TarotCards/8.gif'),
    9: require('@/assets/images/tarrot/TarotCards/9.gif'),
    10: require('@/assets/images/tarrot/TarotCards/10.gif'),
    11: require('@/assets/images/tarrot/TarotCards/11.gif'),
    12: require('@/assets/images/tarrot/TarotCards/12.gif'),
    13: require('@/assets/images/tarrot/TarotCards/13.gif'),
    14: require('@/assets/images/tarrot/TarotCards/14.gif'),
    15: require('@/assets/images/tarrot/TarotCards/15.gif'),
    16: require('@/assets/images/tarrot/TarotCards/16.gif'),
    17: require('@/assets/images/tarrot/TarotCards/17.gif'),
    18: require('@/assets/images/tarrot/TarotCards/18.gif'),
    19: require('@/assets/images/tarrot/TarotCards/19.gif'),
    20: require('@/assets/images/tarrot/TarotCards/20.gif'),
    21: require('@/assets/images/tarrot/TarotCards/21.gif'),
    22: require('@/assets/images/tarrot/TarotCards/22.gif'),
    23: require('@/assets/images/tarrot/TarotCards/23.gif'),
    24: require('@/assets/images/tarrot/TarotCards/24.gif'),
  };




export default function TNResult({ navigation, cards }: any) {
    const { colorScheme } = useColorScheme();
    const [more, setIsMore] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [count, setCount] = useState(3)
    const [loading, setLoading] = useState(false)
    
    

    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
      });
    
    const scale = useRef(new Animated.Value(1)).current;


    console.log("here are the result:", cards)
    console.log(navigation)


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




      const handleClick = () => {
        setIsClicked(true)
        setCount(count - 1)
      }

      const handleMore = () => {
        setIsMore(true)
      }
    
      console.log(isClicked)
      console.log(count)

    
    return (
        <SafeAreaView  style={{ backgroundColor: '#000', flex: 1 }}>
  <LinearGradient
    colors={['#000', 'rgba(34,32,109,255)']} 
    start={{ x: 0, y: 0}} 
    end={{ x: 0, y: 1.1 }} 
    style={{
      position: 'absolute',
      width: '150%',
      height: '150%',
      borderRadius: 999,
    }}
  />
         
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
              onPress={() => navigation.navigate('Tarrot')}>
              <View style={{padding: 10, backgroundColor: 'rgba(50, 50, 50, 1)', borderRadius: 999}}>
                <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
                </View>
                <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>CARD RESULTS</Text>
              </TouchableOpacity>

                 <ScrollView style={{
                  flexDirection: 'column',
                  marginTop: 20
                }}>
                  <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 30
                  }}>
  
  <View 
                    style={{
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderStyle: 'dotted',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
     <LinearGradient
      colors={['#000', '#B2AFFE']} 
      start={{ x: 0, y: 0}} 
      end={{ x: 4, y: 0 }} 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
  
        borderRadius: 10
      }}
    />

    <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 10,
    }}>
          <Image
   source={cards[0]}
   style={{ width: 100, height: 160, marginTop: 5 }}
   resizeMode="cover"
  />
       <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '65%',
        padding: 5
               }}>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 28,
            fontFamily: 'SemiBold', 
          }}
        >
            Test
        </Text>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 15,
            fontFamily: 'SemiBold', 
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, neque molestias? Suscipit reprehenderit blanditiis repellendus soluta autem recusandae, doloremque minima ab 
        </Text>

       </View>

    </View>
       <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     marginTop: 5
                     
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                 
                   <Animated.View
                 style={{
                   transform: [{ scale }],
                    paddingHorizontal: 10,
                 }}
               >
  <Text
    style={{    
        color: "#B2AFFE",
        fontSize: 20,
        fontFamily: 'Bold',         
        textShadowOffset: { width: 0, height: 0 },
      }}
  >
   Read more
  </Text>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: '53%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
  
  
                    </View>
                    <View 
                    style={{
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderStyle: 'dotted',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
     <LinearGradient
      colors={['#000', '#B2AFFE']} 
      start={{ x: 0, y: 0}} 
      end={{ x: 4, y: 0 }} 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
  
        borderRadius: 10
      }}
    />

    <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 10,
    }}>
          <Image
   source={cards[1]}
   style={{ width: 100, height: 160, marginTop: 5 }}
   resizeMode="cover"
  />
       <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '65%',
        padding: 5
               }}>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 28,
            fontFamily: 'SemiBold', 
          }}
        >
            Test
        </Text>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 15,
            fontFamily: 'SemiBold',         
         
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, neque molestias? Suscipit reprehenderit blanditiis repellendus soluta autem recusandae, doloremque minima ab 
        </Text>

       </View>

    </View>
       <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     marginTop: 5
                     
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                 
                   <Animated.View
                 style={{
                   transform: [{ scale }],
                    paddingHorizontal: 10,
                 }}
               >
  <Text
    style={{    
        color: "#B2AFFE",
        fontSize: 20,
        fontFamily: 'Bold',         
        textShadowOffset: { width: 0, height: 0 },
      }}
  >
   Read more
  </Text>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: '53%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
  
  
                    </View>
                    
                    <View 
                    style={{
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderStyle: 'dotted',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
     <LinearGradient
      colors={['#000', '#B2AFFE']} 
      start={{ x: 0, y: 0}} 
      end={{ x: 4, y: 0 }} 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
  
        borderRadius: 10
      }}
    />

    <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 10,
    }}>
          <Image
   source={cards[2]}
   style={{ width: 100, height: 160, marginTop: 5 }}
   resizeMode="cover"
  />
       <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '65%',
        padding: 5
               }}>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 28,
            fontFamily: 'SemiBold',         
          }}
        >
            Mood the Fortune
        </Text>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 15,
            fontFamily: 'SemiBold', 
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, neque molestias? Suscipit reprehenderit blanditiis repellendus soluta autem recusandae, doloremque minima ab 
        </Text>

       </View>

    </View>
       <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     marginTop: 5
                     
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                 
                   <Animated.View
                 style={{
                   transform: [{ scale }],
                    paddingHorizontal: 10,
                 }}
               >
  <Text
    style={{    
        color: "#B2AFFE",
        fontSize: 20,
        fontFamily: 'Bold',         
        textShadowOffset: { width: 0, height: 0 },
      }}
  >
   Read more
  </Text>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: '53%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
  
  
                    </View>


                    <View 
                    style={{
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderStyle: 'dotted',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
     <LinearGradient
      colors={['#000', '#B2AFFE']} 
      start={{ x: 0, y: 0}} 
      end={{ x: 4, y: 0 }} 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
  
        borderRadius: 10
      }}
    />

    <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 10,
    }}>
          <Image
   source={cards[3]}
   style={{ width: 100, height: 160, marginTop: 5 }}
   resizeMode="cover"
  />
       <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '65%',
        padding: 5
               }}>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 28,
            fontFamily: 'SemiBold',         
          }}
        >
           Test
        </Text>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 15,
            fontFamily: 'SemiBold', 
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, neque molestias? Suscipit reprehenderit blanditiis repellendus soluta autem recusandae, doloremque minima ab 
        </Text>

       </View>

    </View>
       <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     marginTop: 5
                     
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                 
                   <Animated.View
                 style={{
                   transform: [{ scale }],
                    paddingHorizontal: 10,
                 }}
               >
  <Text
    style={{    
        color: "#B2AFFE",
        fontSize: 20,
        fontFamily: 'Bold',         
        textShadowOffset: { width: 0, height: 0 },
      }}
  >
   Read more
  </Text>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: '53%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
  
  
                    </View>


                    <View 
                    style={{
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderStyle: 'dotted',
                      borderRadius: 10,
                     flexDirection: 'column',
                      width: '100%',
                    }}>
     <LinearGradient
      colors={['#000', '#B2AFFE']} 
      start={{ x: 0, y: 0}} 
      end={{ x: 4, y: 0 }} 
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
  
        borderRadius: 10
      }}
    />

    <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 10,
    }}>
          <Image
   source={cards[4]}
   style={{ width: 100, height: 160, marginTop: 5 }}
   resizeMode="cover"
  />
       <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '65%',
        padding: 5
               }}>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 28,
            fontFamily: 'SemiBold',         
          }}
        >
            Test
        </Text>
        <Text
         style={{    
            color: "#B2AFFE",
            fontSize: 15,
            fontFamily: 'SemiBold', 
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, neque molestias? Suscipit reprehenderit blanditiis repellendus soluta autem recusandae, doloremque minima ab 
        </Text>

       </View>

    </View>
       <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     marginTop: 5
                     
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                 
                   <Animated.View
                 style={{
                   transform: [{ scale }],
                    paddingHorizontal: 10,
                 }}
               >
  <Text
    style={{    
        color: "#B2AFFE",
        fontSize: 20,
        fontFamily: 'Bold',         
        textShadowOffset: { width: 0, height: 0 },
      }}
  >
   Read more
  </Text>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: 5,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 10,
                     width: 10,
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 5,
                     width: '53%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
  
  
                    </View>
                  </View>
                  </ScrollView>
  
  
                        

              
    </SafeAreaView>
    );
}
  





