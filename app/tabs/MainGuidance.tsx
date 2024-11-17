import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Analyze from '@/components/Dream/analyze';
import Result from './guidance/Dresult';
import Main from '@/components/Dream/main';
import Guidance from './guidance/guidance';
import Dream from './guidance/dream';

export type GuidanceStackParamList = {
  Guidance: undefined;
  Dream: undefined;
  Analyze: undefined;
  Result: undefined;
  Main: undefined;
};

export default function MGuidance() {
  const Stack = createStackNavigator<GuidanceStackParamList>();
  const navigation = useNavigation();

  const currentRouteName = useNavigationState((state) => {
    const guidanceTabRoute = state.routes.find(
      (route) => route.name === 'Guidance1'
    );

    if (guidanceTabRoute?.state) {
      const innerState = guidanceTabRoute.state as any;
      const innerRoute = innerState.routes[innerState.index];
      return innerRoute.name;
    }

    return guidanceTabRoute?.name;
  });

  React.useEffect(() => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setParams({ currentGuidanceRoute: currentRouteName });
    }
  }, [currentRouteName, navigation]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Guidance"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="Guidance" component={Guidance} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Analyze" component={Analyze} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
