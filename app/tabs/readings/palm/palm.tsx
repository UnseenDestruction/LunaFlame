import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Guidance/Dream/main';
import Analyze from '@/components/Guidance/Dream/analyze';
import { useState, useEffect } from 'react';
import MPalm from '@/components/Readings/palm/main';
import Instruction from '@/components/Readings/palm/instruction';
import Capture from '@/components/Readings/palm/captured';
import React from 'react';

export default function Test({ navigation }: any) {
    const [showInstruction, setShowInstruction] = useState(false);
  
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        {showInstruction ? (
          <Instruction navigation={navigation} />
        ) : (
          <MPalm navigation={navigation} onShowInstruction={() => setShowInstruction(true)} />
        )}
      </SafeAreaProvider>
    );
  }
  