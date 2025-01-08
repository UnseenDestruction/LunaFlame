import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Guidance/Dream/main';
import Analyze from '@/components/Guidance/Dream/analyze';
import { useState, useEffect } from 'react';
import MPalm from '@/components/Readings/palm/main';
import Instruction from '@/components/Readings/palm/instruction';
import Capture from '@/components/Readings/palm/captured';
import React from 'react';
import MBirth from '@/components/Readings/birth/main';

export default function Birth({ navigation }: any) {
  
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <MBirth navigation={navigation}/>
      </SafeAreaProvider>
    );
  }
  