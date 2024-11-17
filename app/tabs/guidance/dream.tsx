import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '@/components/Dream/main';
import Analyze from '@/components/Dream/analyze';
import { useState, useEffect } from 'react';


export default function Dream({ navigation }: any) {
  const [loading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    if (analysisResult) {
      setIsAnalyzed(true);
      navigation.navigate('Nav', {
        screen: 'Guidance1',
        params: {
          screen: 'Result', 
          params: {
            assistantResponse: analysisResult.content,
            image: analysisResult.image,
            userMessage: analysisResult.userMessage,
            onReset: resetAnalysis,
          },
        },
        onReset: resetAnalysis,
      });
    }
  }, [analysisResult]);

  const resetAnalysis = () => {
    setIsAnalyzed(false);
    setIsLoading(false);
    setAnalysisResult(null);
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {loading ? (
        <Analyze />
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
