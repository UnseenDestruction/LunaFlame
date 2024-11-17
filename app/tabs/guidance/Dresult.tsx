import React, { useRef, useEffect , useState} from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFonts } from "expo-font";
import Main from "../../../components/Dream/main";
import { RouteProp, useRoute } from "@react-navigation/native";

type GuidanceStackParamList = {
  Result: {
    assistantResponse: string;
    image: string;
    userMessage: string;
  };
};


export default function Result({
  navigation,
  onReset,
}: any) {
  

  const route = useRoute<RouteProp<GuidanceStackParamList, 'Result'>>();
  const { assistantResponse, image, userMessage } = route.params || {};
  const [imageUri, setImageUri] = useState(""); 
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-50)).current;

  const [loaded] = useFonts({
    Light: require("@/assets/fonts/Light.ttf"),
    Medium: require("@/assets/fonts/Medium.ttf"),
    Bold: require("@/assets/fonts/Semibold.ttf"),
  });

  const Logo = require("@/assets/images/logo.png");


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



  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded]);


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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
          <View
          style={{   
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            padding: 10,
            paddingVertical: 10,
            backgroundColor: '#000'
            }}>
          <TouchableOpacity onPress={() => navigation.navigate('Nav', {screen: 'Guidance1', })}
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
          <Text style={{ color: "#B2AFFE", fontSize: 30, fontFamily: "Light" }}>
            DREAM REVEALED
          </Text>
          </View>
        <ScrollView contentContainerStyle={{ alignItems: "center", backgroundColor: '#000' }}>
          <View
            style={{
              height: "60%",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 20,
            }}
          >
                    <Image
                      source={{ uri: image }}
                      style={{ width: 500, height: 400 }}
                    />
          </View>

          <View
            style={{
              position: "relative",
              zIndex: 1,
              width: "95%",
              bottom: 150,
              height: 320,
              borderColor: '#fff',
              opacity: 1,
            }}
          >
          
              <LinearGradient
                colors={["#252376", "#000"]}
                style={{
                  padding: 20,
                  borderRadius: 20,
                  borderWidth: 2
                }}
                locations={[1, 0.5]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              >
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 25,
                      marginBottom: 10,
                      textShadowColor: "#B2AFFE",
                      textShadowRadius: 5,
                      fontFamily: "Medium",
                      textShadowOffset: { width: 0, height: 0 },
                      opacity: 0.9,
                    }}
                  >
                    Your dream revealed
                  </Text>
                  <Text
                    style={{
                      color: "#FFDEE9",
                      fontSize: 16,
                      textAlign: "center",
                      fontFamily: "Light",
                    }}
                  >
                    {assistantResponse}
                  </Text>
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 20,
                      marginBottom: 10,
                      textShadowColor: "#B2AFFE",
                      textShadowRadius: 10,
                      textShadowOffset: { width: 0, height: 0 },
                      opacity: 0.9,
                      fontFamily: "Medium",
                    }}
                  >
                    Your dream
                  </Text>
                  <Text
                    style={{
                      color: "#FFDEE9",
                      padding: 6,
                      fontSize: 14,
                      fontFamily: "Light",
                    }}
                  >
                    {userMessage}
                  </Text>
                </View>
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
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
          style={{
            backgroundColor: "#B2AFFE66",
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
          onPress={() => {
            onReset(); 
          }}
        >
  <Text
    style={{
      color: "#fff",
      fontSize: 13,
      fontFamily: 'bold'
    }}
  >
    ANOTHER DREAM
  </Text>
</TouchableOpacity>

                </Animated.View>
                <Animated.View
                  style={{
                    borderColor: "#B2AFFE52",
                    borderWidth: 1,
                    borderRadius: 999,
                    padding: 5,
                    transform: [{ scale }]
                  }}
                >
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Nav')}
                    style={{
                      backgroundColor: "#B2AFFE",
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
                        color: "#000",
                        fontSize: 13,
                        fontFamily: 'bold'
                      }}
                    >
                      BACK TO HOME
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
              </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
