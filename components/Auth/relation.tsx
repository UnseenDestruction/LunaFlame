import React, { useState, useRef, useEffect } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Animated 
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Logo from '@/assets/images/auth/relation/relation.svg';
import InRelation from '@/assets/images/auth/relation/In.svg';
import Married from '@/assets/images/auth/relation/comit.svg';
import Engage from '@/assets/images/auth/relation/engage.svg';
import Single from '@/assets/images/auth/relation/none.svg';
import Widow from '@/assets/images/auth/relation/widow.svg';
import Divorce from '@/assets/images/auth/relation/understand.svg';

export default function Relation({
  relation,
  setRelation,
  goNext,
}: any) {
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

console.log(relation)

  const [loaded] = useFonts({
    Light: require('@/assets/fonts/Light.ttf'),
    Regular: require('@/assets/fonts/Regular.ttf'),
    Medium: require('@/assets/fonts/Medium.ttf'),
    Bold: require('@/assets/fonts/QuicksandSemiBold.ttf'),
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
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#B2AFFE" />
      </SafeAreaProvider>
    );
  }

  const statuses = [
    { label: 'In a relationship', icon: <InRelation width={40} height={40} /> },
    { label: 'Single', icon: <Single width={40} height={40} /> },
    { label: 'Married', icon: <Married width={40} height={40} /> },
    { label: 'Engaged', icon: <Engage width={40} height={40} /> },
    { label: 'Widow', icon: <Widow width={40} height={40} /> },
    { label: 'Divorced', icon: <Divorce width={40} height={40} /> },
  ];

  return (
    <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <Text
              style={{
                fontFamily: 'Light',
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Your current status provides insights into your love life.
            </Text>

            <Logo width={400} height={300} />

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                position: 'relative',
                top: -70                
              }}
            >
              {statuses.map((status, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setRelation(status.label)}
                  style={{
                    width: '48%',
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#B2AFFE',
                    marginBottom: 15,
                    opacity: relation === status.label ? 1 : 0.5,
                  }}
                >
                  {status.icon}
                  <Text
                    style={{
                      fontFamily: 'Bold',
                      color: '#B2AFFE',
                      marginTop: 5,
                      textAlign: 'center',
                    }}
                  >
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                position: 'relative',
                top: -60
              }}
            >
              <Animated.View
                style={{
                  borderColor: '#B2AFFE52',
                  borderWidth: 1,
                  borderRadius: 9999,
                  padding: 5,
                  transform: [{ scale }],
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(178, 175, 254, 0.5)',
                    borderRadius: 999,
                    paddingVertical: 12,
                    paddingHorizontal: 70,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4.65,
                    elevation: 8,
                  }}
                  onPress={() => goNext(setRelation(""))}
                >
                  <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'Bold' }}>SKIP</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={{
                  borderColor: '#B2AFFE52',
                  borderWidth: 1,
                  borderRadius: 9999,
                  padding: 5,
                  transform: [{ scale }],
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#B2AFFE',
                    borderRadius: 999,
                    paddingVertical: 12,
                    paddingHorizontal: 70,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4.65,
                    elevation: 8,
                  }}
                  onPress={goNext}
                >
                  <Text style={{ color: '#000', fontSize: 13, fontFamily: 'Bold' }}>CONFIRM</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </SafeAreaView>
    </SafeAreaProvider>
  );
}
