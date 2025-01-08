import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Image, ActivityIndicator, Animated, Modal, ScrollView  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Nav from './nav';
import NavM from './navm';
import { Lunar } from './lunar';
import { Features } from './features';

import Settings from '@/components/profile/settings';

import Love from '@/assets/images/horoscope/heart.svg';
import Warn from '@/assets/images/horoscope/warn.svg';
import Sad from '@/assets/images/horoscope/sad.png';
import Happy from '@/assets/images/horoscope/happy.png';

import Check from '@/assets/images/horoscope/check.svg';
import Wrong from '@/assets/images/horoscope/wrong.svg';




import Calendar from '@/assets/images/horoscope/calendar.svg';
import Elipse from '@/assets/images/horoscope/elipse.svg';
import Logo from '@/assets/images/logo.svg';
import Pencil from '@/assets/images/profile/pencil.svg';




import Ascendant from '@/assets/images/zodiac/symbol/zodSym.svg';
import Element from '@/assets/images/zodiac//symbol/triangle.svg';
import Moon from '@/assets/images/zodiac/symbol/zodiacSym2.svg';
import Polarity from '@/assets/images/zodiac/symbol/gender.svg';
import Male from '@/assets/images/auth/gender/male.svg';
import Coin from '@/assets/images/profile/coin.svg'




import Cancer from '@/assets/images/zodiac/Cancer0.png'
import Leo from '@/assets/images/zodiac/Leo0.png'
import Aqua from '@/assets/images/zodiac/Aquarius0.png'
import Virgo from '@/assets/images/zodiac/Virgo.png'
import Capricorn from '@/assets/images/zodiac/Capricorn0.png'


const zodiacImages: Record<string, any> = {
  Cancer: require('@/assets/images/zodiac/Cancer0.png'),
  Leo: require('@/assets/images/zodiac/Leo0.png'),
  Aquarius: require('@/assets/images/zodiac/Aquarius0.png'),
  Aries: require('@/assets/images/zodiac/Aries0.png'),
  Capricorn: require('@/assets/images/zodiac/Capricorn0.png'),
  Gemini: require('@/assets/images/zodiac/Gemini0.png'),
  Libra: require('@/assets/images/zodiac/Libra0.png'),
  Sagittarius: require('@/assets/images/zodiac/Sagittarius0.png'),
  Scorpio: require('@/assets/images/zodiac/Scorpio0.png'),
  Virgo: require('@/assets/images/zodiac/Virgo.png'),
  Pisces: require('@/assets/images/zodiac/Pisces0.png'),
};





export default function Horoscope({ userData,  info,}: any) {
    const scale = useRef(new Animated.Value(1)).current;
    const [isLoading, setLoading] = useState(false)
    const [horoscopeData, setHoroscopeData] = useState<any>([]);


    const sunSignImage = zodiacImages[horoscopeData.sun_sign] || null;

    console.log("here is the:", userData)
    console.log("here is the info:", info)

    console.log("here is the Horoscope:", horoscopeData)

    const today = new Date();

    const getDate = (date: any) => {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

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
    

    useEffect(() => {
        const fetchData = async () => {
            const { data, error: sessionError } = await supabase.auth.getSession();
            const userId = data?.session?.user?.id || "";

          try {
            const { data, error } = await supabase
              .from('horoscopes') 
              .select('*')
              .eq('userId', userId)
              .single()
              
            setHoroscopeData(data)
            console.log("here is the data:", data)
            if (error) throw error;
          } catch (error: any) {
            console.error('Error fetching data from Supabase:', error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [userData]);




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
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000',  gap: 18 }}>
           <ScrollView contentContainerStyle={{ gap: 20,}}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5
      }}>
      <Text style={{ color: '#B2AFFE', fontSize: 30,  fontFamily: 'Medium',  }}>HOROSCOPE</Text>
      <TouchableOpacity style={{
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
      </TouchableOpacity>
      </View>

        <Nav />
      <View style={{
        flexDirection: 'column'
      }}>
   
<View style={{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20
}}>
<View style={{
  gap: 10
}}>
<View style={{
                flexDirection: 'row',
                gap: 5,
                borderColor: '#B2AFFE',
               height: 'auto',
            }}>
              <Ascendant width={40} height={40} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: 'rgba(172,169,247,255)',
                fontFamily: 'Bold',
                fontSize: 15,
                
              }}>
               {horoscopeData?.ascendant || 'N/A'}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Sun Sign
                </Text>
              </View>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
               height: 'auto',
                borderRadius: 20,
            }}>
              <Element width={40} height={40} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
              {horoscopeData?.element || 'N/A'}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Element
                </Text>
              </View>
            </View>

  
</View>

<Elipse width={300} height={300} style={{
     position: 'absolute',
     top: 80
}} />

<View style={{ 
  width: 200, 
  height: 200, 
  borderRadius: 100, 
  justifyContent: 'center', 
  alignItems: 'center', 
  position: 'absolute',
  top: 200
}}>
  <Image 
    source={Leo} 
    style={{ 
      width: 65, 
      height: 65, 
      borderRadius: 999, 
      borderWidth: 3,
      borderColor: 'rgba(107, 77, 150, 0.32)',
      opacity: 0.5,
      position: 'absolute', 
      top: '32%', 
      left: '-20%', 
      transform: [{ translateX: -25 }] 
    }} 
    resizeMode="cover" 
  />
  <Image 
    source={Aqua} 
    style={{ 
      width: 65, 
      height: 65, 
      borderRadius: 999,
      borderWidth: 2,
      borderColor: '#33599F52',
      padding: 2,
      opacity: 0.7,
      position: 'absolute', 
      top: '68%', 
      right: '-10%', 
      transform: [{ translateY: -25 }] 
    }} 
    resizeMode="cover" 
  />
  <View style={{
       position: 'absolute',
       bottom: '-20%', 
       left: '43%', 
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
  }}>
  <Image 
    source={sunSignImage} 
    style={{ 
      width: 80, 
      height: 80, 
      borderRadius: 99, 
      borderWidth: 2,
      borderColor: '#B2303052',
      padding: 2,
   
      transform: [{ translateX: -25 }] 
    }} 
    resizeMode="cover" 
  />
  <Text style={{
      color: '#E47676',
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Bold',
      position: 'relative',
      right: 25,
      top: 10
  }}>
    {horoscopeData?.sun_sign}
  </Text>
  </View>

  <Image 
    source={Virgo} 
    style={{ 
      width: 65, 
      height: 65, 
      borderRadius: 99, 
      position: 'absolute', 
      borderWidth: 2,
      borderColor: '#CFAA5852',
      padding: 2,
      opacity: 0.7,
      top: '73%', 
      left: -20, 
      transform: [{ translateY: -25 }] 
    }} 
    resizeMode="cover" 
  />
  <Image 
    source={Capricorn} 
    style={{ 
      width: 50, 
      height: 50, 
      borderRadius: 99, 
      position: 'absolute', 
      borderWidth: 2,
      borderColor: '#AE5B5B52',
      opacity: 0.5,
      top: '30%', 
      right: '-20%', 
      transform: [{ translateX: 25 }] 
    }} 
    resizeMode="cover" 
  />
</View>

<View style={{
            flexDirection: 'column',
            width: '38%',
            position: 'relative',
      }}> 
      <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }}>
      
      <View style={{
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center'
      }}>
      <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', }}>{horoscopeData.name}</Text>
    <View>
      <View style={{ flexDirection: 'row', opacity: 0.8, marginTop: 5, gap: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', opacity: 0.7, fontSize: 14, textAlign: 'center', fontFamily: 'Bold',  }}>You</Text>
          <View style={{ backgroundColor: '#fff', opacity: 0.8, borderRadius: 9999, width: 5, height: 5 }} />
        <Text style={{ color: '#fff', opacity: 0.7, fontSize: 14, textAlign: 'center', fontFamily: 'Bold' }}>2005-07-17</Text>
      </View>
    </View>
      </View>
      <Logo width={100} height={100} />
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: -20
      }}>
{sunSignImage && (
              <Image 
                source={sunSignImage} 
                style={{ width: 200, height: 200 }} 
                resizeMode={ResizeMode.COVER} 
              />
            )}
        </View>

      
   
      </View>


      <View>
<View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                padding: 10,
               height: 'auto',
                borderRadius: 20,
            }}>
              <Moon width={40} height={40} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
              {horoscopeData?.moon_sign || 'N/A'}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Moon Sign
                </Text>
              </View>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: '#B2AFFE',
                padding: 10,
               height: 'auto',
                borderRadius: 20,
            }}>
              <Male width={40} height={40} />
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{
                color: '#B2AFFE',
                fontFamily: 'Bold',
                fontSize: 20,
                
              }}>
              {horoscopeData?.gender || 'N/A'}
              </Text>
              <Text style={{
                    opacity: 0.5,
                    color: '#B2AFFE',
                    fontFamily: 'Bold',
                    fontSize: 12,
                }}> Popularity
                </Text>
              </View>
            </View>

  
</View>

</View>

<View style={{
    flexDirection: 'column',
    marginTop: '35%'
}}>
<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
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
   fontSize: 24
     }}>Affirmation</Text>
    <Text style={{ fontFamily: 'Light', color: '#B2AFFE' }}>{horoscopeData?.affirmation}</Text>
    </View>
</View>



<View style={{
    padding: 15,
    flexDirection: 'column',
    gap: 5
}}>
<Text style={{ 
   fontFamily: 'SemiBold', 
   color: '#FFF',
   fontSize: 24
     }}>Your Today's Horoscope</Text>
    <Text style={{ fontFamily: 'Light', color: '#FFF' }}>{horoscopeData?.affirmation}</Text>

    <TouchableOpacity style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 4,
                     position: 'relative',
                     
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
        fontSize: 16,
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
                     width: '58%',
                     borderRadius: 9999,
                     opacity: 0.8
                   }}/>
               </TouchableOpacity>
    </View>

<View style={{
    flexDirection: 'column'
}}>
<Text
    style={{    
        color: "#B2AFFE",
        fontSize: 28,
        fontFamily: 'Light',         
        textShadowOffset: { width: 0, height: 0 },
        textTransform: "uppercase",
      }}
  >
    DAILY TIPS FOR {horoscopeData?.sun_sign}
  </Text>
<View style={{
    flexDirection: 'row',
    gap: 10,
}}>
  
  <View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    width: '70%'
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
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', gap: 10
    }}>
        <Love width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 24
     }}>Love</Text>
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15 }}>{horoscopeData?.affirmation}</Text>
    </View>
</View>
<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    width: '70%'
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
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', gap: 10
    }}>
        <Warn width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 24
     }}>WARNING</Text>
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15 }}>{horoscopeData?.affirmation}</Text>
    </View>
</View>
<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    width: '70%'
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
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', gap: 10
    }}>
        <Love width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 24
     }}>Love</Text>
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15 }}>{horoscopeData?.affirmation}</Text>
    </View>
</View>
<View
  style={{
    borderRadius: 15,
     overflow: 'hidden', 
    borderColor: '#B2AFFE',
    borderWidth: 0.3,
    width: '70%'
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
    <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', gap: 10
    }}>
        <Love width={30} height={30} />
    <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 24
     }}>Love</Text>
    </View>

    <Text style={{ fontFamily: 'Light', color: '#B2AFFE', fontSize: 15 }}>{horoscopeData?.affirmation}</Text>
    </View>
</View>

</View>

<View style={{
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
}}>
<View style={{
    width: 10,
    height: 10,
    backgroundColor: '#B2AFFE',
    borderRadius: 99
}}/>
<View style={{
    width: 10,
    height: 10,
    backgroundColor: '#B2AFFE',
    opacity: 0.4,
    borderRadius: 99
}}/>
<View style={{
    width: 10,
    height: 10,
    backgroundColor: '#B2AFFE',
    opacity: 0.4,
    borderRadius: 99
}}/>
<View style={{
    width: 10,
    height: 10,
    backgroundColor: '#B2AFFE',
    opacity: 0.4,
    borderRadius: 99
}}/>
    </View>


</View>

<View style={{
    flexDirection: 'column',
    marginTop: 20
}}>
<Text
    style={{    
        color: "#FC0160",
        fontSize: 28,
        fontFamily: 'Light',         
        textShadowOffset: { width: 0, height: 0 },
        textTransform: "uppercase",
      }}
  >
    TODAY'S MATCHES
  </Text>
  <View style={{
        borderWidth: 0.3,
        borderColor: '#FC0160',
        borderRadius: 10,
        flexDirection: 'column',
        paddingBottom: 30
  }}>

<View style={{
   borderBottomColor: '#FC0160',
   borderBottomWidth: 0.3,
   borderRadius: 10,
   padding: 10
}}>
<NavM  />
</View>

<View style={{
    flexDirection: 'row',

}}>
  
  <View
  style={{
     overflow: 'hidden', 
    borderRightColor: '#FC0160',
    borderRightWidth: 0.3, 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  }}
>
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }}>
 <Image 
    source={Happy} 
    style={{ 
      width: 100, 
      height: 150, 
    }} 
    resizeMode="cover" 
  />
    <Check width={30} height={30} style={{
        position: 'relative',
        top: 10,
        right: 10
    }}/>
    </View>
    <View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
        }}>
        <Moon width={40} height={40} />
        <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 18
     }}>Test</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
        }}>
        <Ascendant width={40} height={40} />
        <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 18
     }}>Test</Text>
        </View>
    </View>
    

</View>
<View
  style={{
     overflow: 'hidden', 
 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 10
  }}
>
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }}>
 <Image 
    source={Sad} 
    style={{ 
      width: 110, 
      height: 150, 
    }} 
    resizeMode="cover" 
  />
    <Wrong width={30} height={30} style={{
        position: 'relative',
        top: 10,
        right: 20
    }}/>
    </View>
    <View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
        }}>
        <Moon width={40} height={40} />
        <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 18
     }}>Test</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
        }}>
        <Ascendant width={40} height={40} />
        <Text style={{ 
   fontFamily: 'Bold', 
   color: '#B8A9FF',
   fontSize: 18
     }}>Test</Text>
        </View>
    </View>
</View>
</View>
<View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18
                    }}>
                       <View style={{
                      backgroundColor: '#FC0160',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                    <View style={{
                      backgroundColor: '#FC0160',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                  
                  
                    <Animated.View
                  style={{
                    borderColor: "#FC0160",
                    borderWidth: 0.3,
                    borderRadius: 999,
                    padding: 5,
                    transform: [{ scale }],
                  }}
                >
                    <TouchableOpacity
          style={{
            backgroundColor: "#FC0160",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 30,
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
      fontSize: 18,
      fontFamily: 'Bold'
    }}
  >
    READ MORE
  </Text>
</TouchableOpacity>
                </Animated.View>
                <View style={{
                      backgroundColor: '#FC0160',
                      height: 20,
                      width: 20,
                      borderRadius: 9999
                    }}/>

                <View style={{
                      backgroundColor: '#FC0160',
                      height: 12,
                      width: 12,
                      borderRadius: 9999
                    }}/>
                </View>


</View>
</View>
<Lunar />

<Features />
</View>

</View>
            </ScrollView>
  </SafeAreaProvider>
    );
}
