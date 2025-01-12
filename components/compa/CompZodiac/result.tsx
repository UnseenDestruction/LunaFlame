import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Animated,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ResizeMode } from "expo-av";

const { width } = Dimensions.get("window");

import Cancer from "@/assets/images/zodiac/Cancer0.png";
import Leo from "@/assets/images/zodiac/Leo0.png";
import Plus from "@/assets/images/compatibility/zodiac/plus.svg";

const zodiacData = [
  { name: "Aries", date: "21 Mar - 19 Apr", image: require("@/assets/images/zodiac/Aries0.png") },
  { name: "Gemini", date: "21 May - 20 Jun", image: require("@/assets/images/zodiac/Gemini0.png") },
  { name: "Cancer", date: "21 Jun - 22 Jul", image: require("@/assets/images/zodiac/Cancer0.png") },
  { name: "Leo", date: "23 Jul - 22 Aug", image: require("@/assets/images/zodiac/Leo0.png") },
  { name: "Virgo", date: "23 Aug - 22 Sep", image: require("@/assets/images/zodiac/Virgo.png") },
  { name: "Libra", date: "23 Sep - 22 Oct", image: require("@/assets/images/zodiac/Libra0.png") },
  { name: "Scorpio", date: "23 Oct - 21 Nov", image: require("@/assets/images/zodiac/Scorpio0.png") },
  { name: "Sagittarius", date: "22 Nov - 21 Dec", image: require("@/assets/images/zodiac/Sagittarius0.png") },
  { name: "Capricorn", date: "22 Dec - 19 Jan", image: require("@/assets/images/zodiac/Capricorn0.png") },
  { name: "Aquarius", date: "20 Jan - 18 Feb", image: require("@/assets/images/zodiac/Aquarius0.png") },
  { name: "Pisces", date: "19 Feb - 20 Mar", image: require("@/assets/images/zodiac/Pisces0.png") },
];

export default function ZodiacResult({ navigation }: any) {
  const [loaded] = useFonts({
    Light: require("@/assets/fonts/Light.ttf"),
    Medium: require("@/assets/fonts/Medium.ttf"),
    SemiBold: require("@/assets/fonts/Semibold.ttf"),
    Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
  });

  const [selectedSigns, setSelectedSigns] = useState<(typeof zodiacData)[0][]>([]); // Array to store selected signs
  const scale = useRef(new Animated.Value(1)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, [scale]);

  if (!loaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaView>
    );
  }

  const ITEM_WIDTH = width / 3;
  const CENTER_OFFSET = width / 2 - ITEM_WIDTH / 2;

  const handleSelectSign = (sign: typeof zodiacData[0]) => {
    if (selectedSigns.length < 2) {
      setSelectedSigns((prev) => [...prev, sign]);
    } else {
      setSelectedSigns([selectedSigns[1], sign]); 
    }
  };

  const renderZodiac = ({ item, index }: { item: typeof zodiacData[0]; index: number }) => {
    const inputRange = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH];

    const scaleValue = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1.5, 0.8],
      extrapolate: "clamp",
    });

    const glowOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => handleSelectSign(item)}>
        <Animated.View
          style={{
            alignItems: "center",
            width: ITEM_WIDTH,
            transform: [{ scale: scaleValue }],
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: 75,
              opacity: glowOpacity,
              zIndex: -1,
            }}
          />
          <Image source={item.image} style={{ width: 120, height: 120 }} />
          <Text
            style={{
              fontFamily: "Bold",
              color: "#B2AFFE",
              fontSize: 16,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: "Light",
              color: "#fff",
              fontSize: 14,
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            {item.date}
          </Text>
          <View
            style={{
              height: 2,
              width: 100,
              backgroundColor: "#B2AFFE",
              marginTop: 10,
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <TouchableOpacity
        style={{
          overflow: "hidden",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          borderRadius: 10,
          padding: 10,
        }}
        onPress={() => navigation.navigate("Nav")}
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
        <Text
          style={{
            fontFamily: "Medium",
            color: "#B2AFFE",
            fontSize: 27,
          }}
        >
          COMPATIBILITY REPORT
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>

          <Image
            source={Cancer}
            style={{ width: 150, height: 150 }}
            resizeMode={ResizeMode.COVER}
          />
          <Text
        style={{
          fontSize: 20,
          fontFamily: "Light",
          color: "#B2AFFE",
          textAlign: "center",
        }}
      >
        Cancer
      </Text>
      </View>
          
        <Plus width={50} height={50} />
        {selectedSigns[1] && (
            <View>
          <Image
            source={selectedSigns[1].image}
            style={{ width: 150, height: 150 }}
            resizeMode={ResizeMode.COVER}
          />

<Text
        style={{
          fontSize: 20,
          fontFamily: "Light",
          color: "#B2AFFE",
          textAlign: "center",
        }}
      >
        {selectedSigns[1].name}
      </Text>
          </View>
        )}
      </View>

      <Text
        style={{
          fontSize: 35,
          fontFamily: "Light",
          color: "#B2AFFE",
          textAlign: "center",
          marginTop: 80,
        }}
      >
        SELECT A SIGN
      </Text>

      <FlatList
        data={zodiacData}
        renderItem={renderZodiac}
        horizontal
        style={{
            marginBottom: 120
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: "center", paddingHorizontal: CENTER_OFFSET }}
        keyExtractor={(item) => item.name}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

<View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 18
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
                    // onPress={handleSend}
          style={{
            backgroundColor: "#B2AFFE",
            borderRadius: 999,
            paddingVertical: 12,
            paddingHorizontal: 50,
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
      fontSize: 12,
      fontFamily: 'Bold'
    }}
  >
    REVEAL COMPABILITY
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
    </SafeAreaView>
  );
}
