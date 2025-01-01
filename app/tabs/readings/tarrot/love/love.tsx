import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Guidance/Dream/main';
import Analyze from '@/components/Guidance/Dream/analyze';
import { useState, useEffect } from 'react';
import MPalm from '@/components/Readings/palm/main';
import Instruction from '@/components/Readings/palm/instruction';
import Capture from '@/components/Readings/palm/captured';
import React from 'react';
import TLMain from '@/components/tarrot/love/main';

export default function Love({ navigation }: any) {
  
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <TLMain navigation={navigation}/>
      </SafeAreaProvider>
    );
  }
  