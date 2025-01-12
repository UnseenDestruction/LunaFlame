import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import React from 'react';
import ZodiacAnalyze from '@/components/compa/CompZodiac/analyze';
import MZodiac from '@/components/compa/CompZodiac/main';


export default function CompBirth({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);


  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzed(true);
      navigation.navigate('Nav', {
        screen: 'TabCompatibility',
        params: {
          screen: 'ZodiacResult', 
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
        <ZodiacAnalyze />
      ) : (
        <MZodiac
          navigation={navigation}
          setIsLoading={setIsLoading}
          setAnalysisResult={setAnalysisResult}
        />
      )}
    </SafeAreaProvider>
  );
}
