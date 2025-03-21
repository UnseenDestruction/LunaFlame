import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Guidance/Dream/main';
import Analyze from '@/components/Guidance/Dream/analyze';
import Result from '@/app/tabs/guidance/Dresult';
import { useState, useEffect } from 'react';
import React from 'react';
import CMain from '@/components/Guidance/Crystal/main';
import { useRoute } from '@react-navigation/native';

export default function Crystal({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);


  const route = useRoute();
  console.log('Current route name:', route.name);


  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzed(true);
    }
  }, [analysisResult]);

  const resetAnalysis = () => {
    setIsAnalyzed(false);
    setAnalysisResult(null);
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: loading || !isAnalyzed ? { display: 'none' } : { display: 'flex' },
    });
  }, [navigation, loading, isAnalyzed]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {loading ? (
        <Analyze />
      ) : isAnalyzed ? (
        <Result
          assistantResponse={analysisResult.content}
          image={analysisResult.image}
          userMessage={analysisResult.userMessage}
          setIsLoading={setIsLoading}
          onBack={resetAnalysis}
        />
      ) : (
        <CMain
          navigation={navigation}
          setIsLoading={setIsLoading}
          setAnalysisResult={setAnalysisResult}
        />
      )}
    </SafeAreaProvider>
  );
}
