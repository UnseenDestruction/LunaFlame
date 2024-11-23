import React from 'react';
import { useColorScheme } from 'nativewind';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
  TabButtonLayout
} from 'react-native-animated-nav-tab-bar';
import { View, Text } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import MReadings from './tabs/Mreadings';
import MGuidance from './tabs/MainGuidance';
import MCompatibility from './tabs/Mcompatibility';
import MHoroscope from './tabs/Mhoroscope';
import MProfile from './tabs/Mprofile';

import Horoscope from '@/assets/images/nav/moon.svg';
import Readings from '@/assets/images/nav/live.svg';
import Profile from '@/assets/images/nav/profile.svg';
import Guidance1 from '@/assets/images/nav/guidance.svg';
import Compatibility from '@/assets/images/nav/yinyang.svg';
import CHoroscope from '@/assets/images/nav/clicked/Moon.svg';
import CReadings from '@/assets/images/nav/clicked/live.svg';
import CProfile from '@/assets/images/nav/clicked/profile.svg';
import CGuidance from '@/assets/images/nav/clicked/guidance.svg';
import CCompatibility from '@/assets/images/nav/clicked/Compa.svg';




export default function Nav({route}: any) {
  const Tabs = AnimatedTabBarNavigator();
  const { colorScheme } = useColorScheme();
  

  return (
    <Tabs.Navigator
      appearance={{
        floating: false,
        topPadding: 0,
        horizontalPadding: 0,
        tabBarBackground: colorScheme === 'dark' ? '#000' : '#FFFFFF',
        activeTabBackgrounds: [colorScheme === 'dark' ? '#B2AFFE' : '#ECEEF8'],
        activeColors: ['#FFFFFF'],
        shadow: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
        whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
        tabButtonLayout: TabButtonLayout.VERTICAL,
        dotSize: DotSize.SMALL,
        dotCornerRadius: 100,
      }}
      tabBarOptions={{
        activeTintColor: '#B2AFFE',
        inactiveTintColor: '#A0A0A0',
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        labelStyle: {
          fontSize: 14,
          marginTop: 8,
          opacity: 0.6,
        },
      }}
      initialRouteName={'Home'}
    >
      <Tabs.Screen
        name="TabHoroscope"
        component={MHoroscope}
        options={{
          tabBarLabel: 'Horoscope',
          tabBarIcon: ({ focused }: any) =>
            focused ? (
             <CHoroscope width={25} height={25}/>
            ) : (
                <Horoscope width={25} height={25}/>
            ),
    }}
      />
      <Tabs.Screen
        name="TabReadings"
        component={MReadings}
        options={{
          tabBarLabel: 'Readings',
          tabBarIcon: ({ focused }: any) =>
            focused ? (
             <CReadings  width={25} height={25}/>
            ) : (
                <Readings width={25} height={25}/>
            ),
    }}
      />
      <Tabs.Screen
        name="TabCompatibility"
        component={MCompatibility}
        options={{
          tabBarLabel: 'Compatibility',
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <CCompatibility width={25} height={25}/>
            ) : (
                <Compatibility width={25} height={25}/>
            ),
    }}
      />
   <Tabs.Screen
  name="TabGuidance" 
  component={MGuidance}
  options={{
    tabBarLabel: 'Guidance',
    tabBarIcon: ({ focused }: any) =>
      focused ? (
        <CGuidance width={25} height={25} />
      ) : (
        <Guidance1 width={25} height={25} />
      ),
  }}
/>

      <Tabs.Screen
        name="TabProfile"
        component={MProfile}
        options={{
          tabBarStyle: { display: 'none' }, 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <CProfile width={25} height={25}/>
            ) : (
              <Profile width={25} height={25}/>
            ),
    }}
      />
    </Tabs.Navigator>
  );
}
