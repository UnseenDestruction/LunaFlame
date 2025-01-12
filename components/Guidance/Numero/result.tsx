import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator, View, Animated, Image, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";

import Logo from "@/assets/images/logo.svg";
import Electric from "@/assets/images/auth/electric.gif";
import three from "@/assets/images/guidance/numerology/3.png";
import seven from "@/assets/images/guidance/numerology/7.png";

const numberImages: Record<number, any> = {
  1: three,
  2: three,
  3: three,
  4: three,
  5: three,
  6: three,
  7: seven,
  8: seven,
  9: seven,
  10: seven,
  11: seven,
  12: seven,
  13: seven,
  14: seven,
  15: seven,
  16: seven,
  17: seven,
  18: seven,
};

export default function NumeroResult({ navigation, response }: any) {
  const [loaded] = useFonts({
    Light: require("@/assets/fonts/Light.ttf"),
    Medium: require("@/assets/fonts/Medium.ttf"),
    SemiBold: require("@/assets/fonts/Semibold.ttf"),
    Bold: require("@/assets/fonts/QuicksandSemiBold.ttf"),
  });

  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const scale = useRef(new Animated.Value(1)).current;

  console.log("here are the response content:", response)


  useEffect(() => {
    const pulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.1, duration: 700, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    };
    pulse();
  }, [scale]);

  if (!loaded) {
    return (
      <SafeAreaProvider style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <ActivityIndicator size="large" color="#FC0160" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <LinearGradient
        colors={["#000", "rgba(34,32,109,255)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.1 }}
        style={{ position: "absolute", width: "150%", height: "150%", borderRadius: 999 }}
      />

      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10 }}
        onPress={() => navigation.navigate("Numerology")}
      >
        <View style={{ padding: 10, backgroundColor: "rgba(50, 50, 50, 1)", borderRadius: 999 }}>
          <AntDesign name="left" size={24} color="rgba(255, 255, 255, 0.5)" />
        </View>
        <Text style={{ color: "#FC0160", fontSize: 30, fontFamily: "Light" }}>YOUR RESULTS</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {response?.content?.map((card: any, index: number) => (
          <View
            key={index}
            style={{
              height: expandedCardIndex === index ? "auto" : 230,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#fff",
              borderStyle: "dotted",
              borderRadius: 10,
              position: "relative",
            }}
          >
            <LinearGradient
              colors={["#000", "#FC0160"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 4, y: 0 }}
              style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 10 }}
            />

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-start", gap: 10, padding: 10 }}>
              <Image source={numberImages[card.number] || null} style={{ width: 100, height: 160 }} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#FC0160", fontSize: 22, fontFamily: "SemiBold" }}>{card.title}</Text>
                <Text
                  style={{ color: "#FC0160", fontSize: 15, fontFamily: "Light", marginTop: 5 }}
                  numberOfLines={expandedCardIndex === index ? 0 : 6}
                >
                  {card.description}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}
              onPress={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
            >
              <View style={{ backgroundColor: "#FC0160", height: 5, width: 5, borderRadius: 9999, opacity: 0.8 }} />
              <View style={{ backgroundColor: "#FC0160", height: 10, width: 10, borderRadius: 9999, opacity: 0.8 }} />
              <View style={{ backgroundColor: "#FC0160", height: 5, width: 5, borderRadius: 9999, opacity: 0.8 }} />
              <Animated.View style={{ transform: [{ scale }], paddingHorizontal: 10 }}>
                <Text style={{ color: "#FC0160", fontSize: 20, fontFamily: "Bold" }}>
                  {expandedCardIndex === index ? "Read less" : "Read more"}
                </Text>
              </Animated.View>
              <View style={{ backgroundColor: "#FC0160", height: 5, width: 5, borderRadius: 9999, opacity: 0.8 }} />
              <View style={{ backgroundColor: "#FC0160", height: 10, width: 10, borderRadius: 9999, opacity: 0.8 }} />
              <View style={{ backgroundColor: "#FC0160", height: 5, width: "53%", borderRadius: 9999, opacity: 0.8 }} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
