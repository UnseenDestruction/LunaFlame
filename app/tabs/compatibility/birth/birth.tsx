import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Guidance/Dream/main';
import Analyze from '@/components/Guidance/Dream/analyze';
import { useState, useEffect } from 'react';
import MPalm from '@/components/Readings/palm/main';
import Instruction from '@/components/Readings/palm/instruction';
import Capture from '@/components/Readings/palm/captured';
import React from 'react';
import MCompa from '@/components/compa/CompBirth/main';

export default function CompBirth({ navigation }: any) {
  
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <MCompa navigation={navigation}/>
      </SafeAreaProvider>
    );
  }
  