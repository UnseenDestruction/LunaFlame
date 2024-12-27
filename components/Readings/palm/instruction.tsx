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
import Captured from './captured';



import Palm from '@/assets/images/readings/palm/palm.svg';
import Hand from '@/assets/images/readings/palm/hand.svg';
import Hand1 from '@/assets/images/readings/palm/hand1.svg';
import Hand2 from '@/assets/images/readings/palm/hand2.svg';
import Scanner from '@/assets/images/readings/palm/scanner.svg';
import Lines from '@/assets/images/readings/palm/lines.svg';



export default function Instruction({ navigation }: any) {
    const { colorScheme } = useColorScheme();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false)
    const [showCamera, setShowCamera] = useState(false)
    const [hasPermission, setHasPermission] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
     const [capturedImage, setCapturedImage] = useState<string>("");
     const cameraRef = useRef<any>(null);
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
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, [scale]);

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
    
      if (loading) {
        interval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 10 : 100));
        }, 1200);
      } else if (!loading && interval) {
        clearInterval(interval);
        setProgress(0);
      }
    
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      };
    }, [loading]);

  

    const takePicture = async (): Promise<void> => {
      setLoading(true)
      if (cameraRef.current) {
        try {
          const picture = await cameraRef.current.takePictureAsync();
          setCapturedImage(picture.uri);

          console.log(picture.uri)
    
        
          const fileName = `image-${Date.now()}.jpg`;
          const imageUrl = await uploadImage({
            fileUri: picture.uri,
            fileName,
          });
    
          if (imageUrl) {
            console.log('Image uploaded to Supabase:', imageUrl);
            const response = await ImageRes(imageUrl);
            setAssistantResponse(response || {});
          }
        } catch (err) {
          console.error('Error capturing or uploading image:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    

    console.log(assistantResponse)
    
  
    if (!hasPermission || hasPermission === null) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
        >
          <Text style={{ color: '#B2AFFE', fontSize: 18, fontFamily: 'Light' }}>
            Camera permission is required to continue
          </Text>
        </SafeAreaView>
      );
    }




    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View >
          <Text>We need your permission to show the camera</Text>
          <TouchableOpacity onPress={requestPermission} />
        </View>
      );
    }


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


      console.log("here is the captured Image:", capturedImage)
    
    
    return (
        <SafeAreaView  style={{ backgroundColor: '#000', flex: 1 }}>
{capturedImage ? (
  <View style={{ flex: 1 }}>
  {loading ? (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          position: 'absolute',
        }}
        source={{ uri: capturedImage }}
      />
      <Lines
        width={400}
        height={500}
        style={{
          marginBottom: 150,
          position: 'relative',
          top: 150,
        }}
      />
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              color: '#B2AFFE',
              marginBottom: 10,
              fontWeight: 'bold',
            }}
          >
            {progress}%
          </Text>
          <View
            style={{
              width: '80%',
              height: 8,
              backgroundColor: '#B2AFFE', 
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={['#d1c4e9', '#9575cd']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            color: '#FFF',
            fontSize: 15,
            textAlign: 'center',
            marginTop: 10,
            fontFamily: 'Light', 
          }}
        >
          Read your palm to know your fortune
        </Text>
      </View>
    </View>
  ) : (
   null
  )}
</View>

) : ( 
  !showCamera ? (
            <>

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



<View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18,
                      marginTop: 400
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
                   onPress={() => setShowCamera(true)}
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
      fontFamily: 'Bold'
    }}
  >
    CAPTURE NOW
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
                </>
                  ) : (
                    <>
             <CameraView  
             ref={cameraRef}
             
             >
                <View
            style={{
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 10,
                padding: 10,
                paddingVertical: 20,
            }}

             >
                <Text style={{
                  fontFamily: 'Light',
                  color: '#B2AFFE',
                  fontSize: 25,
                  textAlign: 'center'
                }}>
                  PLACE YOUR HAND IN THE MIDDLE
                </Text>
              </View>
                <Scanner width={400} height={630} style={{
                  position: 'relative',
                  
                }} />
                    <Animated.View
                  style={{
                    borderRadius: 999,
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ scale }],
                  }}
                >
                    <TouchableOpacity
       onPress={async () => {
        try {
           await takePicture(); 
        } catch (error) {
          console.error("Error taking picture or sending:", error);
        }
      }}
          style={{
            backgroundColor: "#B2AFFE",
            borderRadius: 999,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4.65,
            elevation: 8,
            width: 60,
            height: 60,
            position: 'relative',
            top: -10
          }}
        >
</TouchableOpacity>
                </Animated.View>
                </CameraView>
               
                </>

        ))}
      
    </SafeAreaView>
    );
}
  





