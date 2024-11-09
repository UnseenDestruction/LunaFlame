import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Dream/main';
import Analyze from '@/components/Dream/analyze';
import Result from '@/components/Dream/result';
import { useState, useEffect } from 'react';

export default function Dream({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzed(true);
    }
  }, [analysisResult]);


  return (
    <SafeAreaProvider>
      {loading ? (
        <Analyze />
      ) : isAnalyzed ? (
        <Result
          assistantResponse={analysisResult.content}
          image={analysisResult.image}
          userMessage={analysisResult.userMessage}
          setIsLoading={setIsLoading}
        />
      ) : (
        <Main
          navigation={navigation}
          setIsLoading={setIsLoading}
          setAnalysisResult={setAnalysisResult}
        />
      )}
    </SafeAreaProvider>
  );
}
