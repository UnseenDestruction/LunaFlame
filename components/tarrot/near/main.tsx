import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { useRef, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode } from 'expo-av';
import _ from 'lodash'
import TNResult from './result';

import Card from '@/assets/images/tarrot/TarotCards/card.svg';

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



export default function TNMain({ navigation }: any) {
    const { colorScheme } = useColorScheme();
    const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false, false]);
    const [selectedCard, setSelectedCard] = useState<any | null>([]);
    const [flip, setIsFlip] = useState(false)
    const [result, setResult] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [count, setCount] = useState(5)
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
    console.log("here is the card:", selectedCard[0])
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



      const handleClick = () => {
        setIsClicked(true)
        setCount(count - 1)
      }

      const Result = () => {
        setResult(true)
      }


      const handleFlipCard = (index: number) => {
        if (selectedCard.length === 0) {
          const shuffledKeys = Object.keys(cardImages).sort(() => Math.random() - 0.5);
          const selected = shuffledKeys.slice(0, 5).map((key) => cardImages[key]);
          setSelectedCard(selected);
        }
    
        setFlippedCards((prev) =>
          prev.map((isFlipped, i) => (i === index ? true : isFlipped))
        );
      };
      console.log(isClicked)
      console.log(count)
      console.log("here are the cards:", selectedCard)

    
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

  {result ? (
null
  ): (
    count > 0 ? (
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
          <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>NEAR FUTURE</Text>
        </TouchableOpacity>
    ): (
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
          <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>FLIP CARDS</Text>
        </TouchableOpacity>
    )

  )}
         
            {result ? (
           <TNResult cards={selectedCard} navigation={navigation} />
            ): (
              count > 0 ? (
                <View style={{
                 flexDirection: 'column',
                 marginTop: 20
               }}>
                 <View style={{
                   flexDirection: 'row',
                   justifyContent: 'center',
                   alignItems: 'center',
                   gap: 10
                 }}>
  
           
                   <View 
                   style={{
                     height: 200,
                     width: 135,
                     borderWidth: 1,
                     borderColor: '#fff',
                     borderStyle: 'dotted',
                     borderRadius: 10,
                     alignItems:'center',
                     justifyContent: 'center'
  
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
  {isClicked  ? (
   <Card width={133} height={190}  style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
  
                   </View>
                   <View 
                   style={{
                     height: 200,
                     width: 130,
                     borderWidth: 1,
                     borderColor: '#fff',
                     borderStyle: 'dotted',
                     borderRadius: 10
  
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
  {count <= 3 ? (
   <Card width={133} height={190}   style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
            </View>
                   <View 
                   style={{
                     height: 200,
                     width: 130,
                     borderWidth: 1,
                     borderColor: '#fff',
                     borderStyle: 'dotted',
                     borderRadius: 10
  
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
  {count <= 2 ? (
   <Card width={133} height={190}  style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
  
                   </View>
                 </View>

                 <View style={{
                   flexDirection: 'row',
                   justifyContent: 'center',
                   alignItems: 'center',
                   gap: 10
                 }}>
  
           
                   <View 
                   style={{
                     height: 200,
                     width: 135,
                     borderWidth: 1,
                     borderColor: '#fff',
                     borderStyle: 'dotted',
                     borderRadius: 10,
                     alignItems:'center',
                     justifyContent: 'center'
  
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
  {count <= 1  ? (
   <Card width={133} height={190}  style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
  
                   </View>
                   <View 
                   style={{
                     height: 200,
                     width: 130,
                     borderWidth: 1,
                     borderColor: '#fff',
                     borderStyle: 'dotted',
                     borderRadius: 10
  
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
  {count <= 0  ? (
   <Card width={133} height={190}   style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
            </View>
                 </View>

                 <View style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                   position: 'relative',
                   right: 20
                 }}>
                   <TouchableOpacity
                   onPress={() => handleClick()}
                   >
                     <Card width={100} height={250} style={{
                       position: 'relative',
                       transform: [{ rotate: '-20deg' }],
                     }}/>
                             </TouchableOpacity>
                     <Card width={100} height={250}
                       onPress={() => handleClick()}
                     style={{
                       position: 'relative',
                       right: 55,
                       bottom: 10,
                       transform: [{ rotate: '-10deg' }],
                     }}
                     />
                     <Card width={100} height={250}
                       onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 110,
                         bottom: 10,
                         transform: [{ rotate: '-5deg' }],
                       }}
                     />
                     <Card width={100} height={250}
                       onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 170,
                         bottom: 10,
                         transform: [{ rotate: '-2deg' }],
                       }}
                     />
                     <Card width={100} height={250}
                       onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 220,
                         bottom: 10,
                         transform: [{ rotate: '0deg' }],
                       }}
                     />
                     <Card width={100} height={250}
                       onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 270,
                         bottom: 10,
                         transform: [{ rotate: '2deg' }],
                       }}
                     />
                      <Card width={100} height={250}
                        onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 300,
                         bottom: 10,
                         transform: [{ rotate: '5deg' }],
                       }}
                     />
                      <Card width={100} height={250}
                        onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 360,
                         bottom: 0,
                         transform: [{ rotate: '10deg' }],
                       }}
                     />
                       <Card width={100} height={250}
                         onPress={() => handleClick()}
                       style={{
                         position: 'relative',
                         right: 420,
                         top: 10,
                         transform: [{ rotate: '20deg' }],
                       }}
                     />
                 </View>
                 <Text style={{
                         color: '#fff',
                         fontSize: 18,
                         fontFamily: 'Bold',
                         position: 'relative',
                         left: 150,
                         top: 40
                       }}>
                        Select {count} Cards
                       </Text>

                       <View style={{
                         borderRadius: 999,
                         borderColor: '#fff',
                         borderWidth: 1,
                         width: 1000,
                         height: 1000,
                         position: 'relative',
                         right: 300,
                         bottom: 10
                       }}>


  
                     <Animated.View
                   style={{
                     borderColor: "#B2AFFE52",
                     borderWidth: 1,
                     borderRadius: 999,
                     padding: 5,
                     paddingHorizontal: 15,
                     transform: [{ scale }],
                     position: 'relative',
                     left: 490,
                     bottom: 15,
                     width: 20,
                     alignItems: 'center'
                   }}
                 >
                     <View
           style={{
             backgroundColor: "#B2AFFE",
             borderRadius: 999,
             padding: 10
           }}
         >
  </View>
                 </Animated.View>

               
                       </View>
  
               </View>
             ) : (
  
  
               <View style={{
                 flexDirection: 'column',
                 marginTop:40
               }}>
          <View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }}
>
  {flippedCards.map((isFlipped, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleFlipCard(index)}
      disabled={isFlipped}
      style={{
        height: 250,
        width: 130,
        borderWidth: 1,
        borderColor: '#fff',
        borderStyle: 'dotted',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LinearGradient
        colors={['#000', '#B2AFFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 4, y: 0 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 10,
        }}
      />
      {isFlipped && selectedCard[index] ? (
        <Image
          source={selectedCard[index]}
          style={{ width: 120, height: 240, borderRadius: 10 }}
          resizeMode="cover"
        />
      ) : (
        <Card width={150} height={220} />
      )}
    </TouchableOpacity>
  ))}
</View>


             
  
  
  
         <View style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 18,
                     marginTop: 100
                   }}>
                      <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 12,
                     width: 12,
                     borderRadius: 9999
                   }}/>
                   <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 20,
                     width: 20,
                     borderRadius: 9999
                   }}/>
  
                 
                 
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
                onPress={() => Result()}
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
     fontFamily: 'bold'
   }}
  >
   GET RESULT
  </Text>
  </TouchableOpacity>
               </Animated.View>
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 20,
                     width: 20,
                     borderRadius: 9999
                   }}/>
  
               <View style={{
                     backgroundColor: '#B2AFFE',
                     height: 12,
                     width: 12,
                     borderRadius: 9999
                   }}/>
               </View>
  
  
               </View>
             )
            )}
             
              
    </SafeAreaView>
    );
}
  





