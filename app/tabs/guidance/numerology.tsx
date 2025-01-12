import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import React from 'react';
import NumeroAnalyze from '@/components/Guidance/Numero/analyze';
import NumeroResult from '@/components/Guidance/Numero/result';
import NMain from '@/components/Guidance/Numero/main';


export default function Numerology({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);


  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzed(true);
      navigation.navigate('Nav', {
        screen: 'TabGuidance',
        params: {
          screen: 'NumeroResult', 
          params: {
            navigation: navigation,
            response: analysisResult?.content,
          },
        },
      });
    }
  }, [analysisResult]);

  const resetAnalysis = () => {
    setIsAnalyzed(false);
    setIsLoading(false);
    setAnalysisResult(null);
  };

  console.log("here is the analysis result for numerology", analysisResult?.content)

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {loading ? (
        <NumeroAnalyze />
      ) : (
        <NMain
          navigation={navigation}
          setIsLoading={setIsLoading}
          setAnalysisResult={setAnalysisResult}
        />
      )}
    </SafeAreaProvider>
  );
}
