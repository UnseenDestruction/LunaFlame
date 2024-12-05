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

export default function Info({
  userData,
  goNext,
}: any) {
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);


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
            
          </SafeAreaView>
    </SafeAreaProvider>
  );
}
