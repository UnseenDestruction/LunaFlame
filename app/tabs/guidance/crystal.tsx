import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Dream/main';
import Analyze from '@/components/Dream/analyze';
import Result from '@/app/tabs/guidance/Dresult';
import { useState, useEffect } from 'react';

export default function Crystal({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);


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
        <Main
          navigation={navigation}
          setIsLoading={setIsLoading}
          setAnalysisResult={setAnalysisResult}
        />
      )}
    </SafeAreaProvider>
  );
}
