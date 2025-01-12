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
import TDResult from './result';
import { TarrotRes } from '@/lib/readings';

import Card from '@/assets/images/tarrot/TarotCards/card.svg';


const cardImages: Record<string, any> = {
  1: { image: require('@/assets/images/tarrot/TarotCards/1.gif'), description: 'Three of Wands' },
  2: { image: require('@/assets/images/tarrot/TarotCards/2.gif'), description: 'The Lovers' },
  3: { image: require('@/assets/images/tarrot/TarotCards/3.gif'), description: 'The World' },
  4: { image: require('@/assets/images/tarrot/TarotCards/4.gif'), description: 'Four of Coins' },
  5: { image: require('@/assets/images/tarrot/TarotCards/5.gif'), description: 'Page of Chalices' },
  6: { image: require('@/assets/images/tarrot/TarotCards/6.gif'), description: 'Eight of Chalices' },
  7: { image: require('@/assets/images/tarrot/TarotCards/7.gif'), description: 'The Fool' },
  8: { image: require('@/assets/images/tarrot/TarotCards/8.gif'), description: 'Eight of Coins' },
  9: { image: require('@/assets/images/tarrot/TarotCards/9.gif'), description: 'The Herophant' },
  10: { image: require('@/assets/images/tarrot/TarotCards/10.gif'), description: 'The Chariot' },
  11: { image: require('@/assets/images/tarrot/TarotCards/11.gif'), description: 'Knight of Swords' },
  12: { image: require('@/assets/images/tarrot/TarotCards/12.gif'), description: 'Four of Chalices' },
  13: { image: require('@/assets/images/tarrot/TarotCards/13.gif'), description: 'Three of Coins' },
  14: { image: require('@/assets/images/tarrot/TarotCards/14.gif'), description: 'Five of Coins' },
  15: { image: require('@/assets/images/tarrot/TarotCards/15.gif'), description: 'Knight of Wands' },
  16: { image: require('@/assets/images/tarrot/TarotCards/16.gif'), description: 'Justice' },
  17: { image: require('@/assets/images/tarrot/TarotCards/17.gif'), description: 'Two Chalices' },
  18: { image: require('@/assets/images/tarrot/TarotCards/18.gif'), description: 'Age of Coins' },
  19: { image: require('@/assets/images/tarrot/TarotCards/19.gif'), description: 'Three of Chalices' },
  20: { image: require('@/assets/images/tarrot/TarotCards/20.gif'), description: 'Knight of Coins' },
  21: { image: require('@/assets/images/tarrot/TarotCards/21.gif'), description: 'Death' },
  22: { image: require('@/assets/images/tarrot/TarotCards/22.gif'), description: 'Queen of Swords' },
  23: { image: require('@/assets/images/tarrot/TarotCards/23.gif'), description: 'The Hanged Man' },
  24: { image: require('@/assets/images/tarrot/TarotCards/24.gif'), description: 'Ace of Chalices' },
};



export default function TDMain({ navigation }: any) {
    const { colorScheme } = useColorScheme();
    const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
    const [selectedCard, setSelectedCard] = useState<any | null>([]);
    const [response, setResponse] = useState()
    const [flip, setIsFlip] = useState(false)
    const [result, setResult] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [count, setCount] = useState(3)
    const [loading, setIsLoading] = useState(false)


    const handleSend = async (selected: any[]) => {
      setIsLoading(true);
  
      try {
        const response = await TarrotRes(selected);

        console.log(response)
  
        if (response?.content) {
          const { content } = response;
          setIsLoading(true);
  
          console.log(content)
          setResponse(content);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching the dream response:", error);
      } finally {
        setIsLoading(false)
      }
    };


    const [loaded] = useFonts({
        Light: require("@/assets/fonts/Light.ttf"),
        Medium: require("@/assets/fonts/Medium.ttf"),
        SemiBold: require("@/assets/fonts/Semibold.ttf"),
        Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
      });
    
    const scale = useRef(new Animated.Value(1)).current;

    console.log('here is the count:', count)
    
   

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
          handleSend(selectedCard);
      }

    

      const handleFlipCard = (index: number) => {
        if (selectedCard.length === 0) {
          const shuffledKeys = Object.keys(cardImages).sort(() => Math.random() - 0.5);
          const selected = shuffledKeys.slice(0, 3).map((key) => cardImages[key]);
          setSelectedCard(selected);
        }

      
    
        setFlippedCards((prev) =>
          prev.map((isFlipped, i) => (i === index ? true : isFlipped))
        );

      
      };
    


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
          <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Light',  }}>DAILY TARROT</Text>
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
           <TDResult cards={selectedCard} navigation={navigation} response={response}  />
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
                     height: 250,
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
   <Card width={133} height={250}  style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
  
                   </View>
                   <View 
                   style={{
                     height: 250,
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
  {count === 1 || count === 0  ? (
   <Card width={133} height={250}  style={{
   borderRadius: 20,
  }}/>
  ): (
  null
  )}
            </View>
                   <View 
                   style={{
                     height: 250,
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
  {count === 0 ? (
   <Card width={133} height={250}  style={{
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
                       gap: 18,
                       marginTop: 10
                     }}>
                       <Text style={{
                         color: '#fff',
                         fontSize: 18,
                         fontFamily: 'Bold'
                       }}>
                         Select
                       </Text>
  
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
                     
                    
                     transform: [{ scale }],
                   }}
                 >
                     <View
           style={{
             borderRadius: 999,
             borderColor: '#B2AFFE',
             borderWidth: 1,
             padding: 15,
           }}
         >
   <Text
     style={{
       fontSize: 30,
       fontFamily: 'Bold',
       color: '#B2AFFE'
     }}
   >
    {count}
   </Text>
  </View>
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
  
  <Text style={{
                         color: '#fff',
                         fontSize: 18,
                         fontFamily: 'Bold'
                       }}>
                        {count} cards left
                       </Text>
                 </View>
  
  
  
                 <View style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                   marginTop: 50,
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
  
                       <View style={{
                         borderRadius: 999,
                         borderColor: '#fff',
                         borderWidth: 1,
                         width: 1000,
                         height: 1000,
                         position: 'relative',
                         right: 300,
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
  
  <Text 
           style={{    
             color: "#FFFFFF",
             fontSize: 40,
             textShadowColor: "#B2AFFE",
             textShadowRadius: 10,       
             fontFamily: 'Bold',         
             textShadowOffset: { width: 0, height: 0 },
             opacity: 0.8,
             textAlign: 'center',
             marginBottom: 100
           }}
         >
           MOOD
         </Text>
  
           <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
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
                 style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 10 }}
               />
               {isFlipped && selectedCard[index] ? (
                 <Image
                   source={selectedCard[index]?.image}
                   style={{ width: 120, height: 240, borderRadius: 10 }}
                   resizeMode="cover"
                 />
               ) : (
                 <Card width={150} height={220} />
               )}
             </TouchableOpacity>
           ))}
         </View>

               <Text 
           style={{    
             color: "#FFFFFF",
             fontSize: 30,
             textShadowColor: "#B2AFFE",
             textShadowRadius: 10,       
             fontFamily: 'Bold',         
             textShadowOffset: { width: 0, height: 0 },
             opacity: 0.8,
             textAlign: 'center',
             marginTop: 20
           }}
         >
           Flip a card
         </Text>
  
  
  
         <View style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 18,
                     marginTop: 170
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
  





