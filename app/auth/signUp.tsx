import React, { useState, useEffect } from 'react';
import { AppState, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

import { supabase } from '@/lib/supabase';
import { signUpWithEmail } from '@/lib/auth';

import { fetchInfo } from '@/lib/info';

import Name from '@/components/Auth/Name';
import Email from '@/components/Auth/Email';
import Password from '@/components/Auth/Password';
import LOB from '@/components/Auth/lob';
import TOB from '@/components/Auth/tob';
import Gender from '@/components/Auth/gender';
import Relation from '@/components/Auth/relation';
import DOB from '@/components/Auth/dob';
import Info from '@/components/Auth/info';
import Prof from '../tabs/profile/prof';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

type SignUpRequest = {
    name: string;
    dob: string;    
    tob: string;     
    lob: string;     
    gender: string;
    relation: string;
    email: string;
    password: string
  };
  
  type SignUpResponse = {
    status: 'success' | 'error';
    message: string;
    content?: string;
  };


const totalSteps = 6;

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});





export default function SignUp({ setMode }: any) {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const { colorScheme } = useColorScheme();
    const [isLoading, setIsLoading] = useState(false);
    const [signupComplete, setSignupComplete] = useState(false); 
    const [info, setInfo] = useState<{ content: string }>({ content: "" });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [tob, setTob] = useState('');
    const [lob, setLob] = useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);


    

    const goNext = () => {
        if (currentStep < totalSteps) {
          setCurrentStep((prev) => prev + 1);
        } else {
          handleSignUp(); 
        }
      };
    const goBack = () => setCurrentStep((prev) => Math.max(1, prev - 1))

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isLoading) {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 10 : 100));
            }, 500);
        } else if (!isLoading && interval) {
            clearInterval(interval);
            setProgress(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    console.log(signupComplete)
    console.log(currentStep)
  

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setDob('');
        setTob('');
        setLob('');
        setGender('');
        setRelation('');
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        tob: '',
        lob: '',
        gender: '',
        relation: '',
    });

    const sanitizedEmail = formData.email || 'unknown@gmail.com';
const sanitizedPassword = formData.password || 'defaultPassword123'

const handleSignUp = async () => {
    setIsLoading(true);
  
    try {
      const requestData: SignUpRequest = {
        name: formData.name,
        email:  '',
        password: '',
        dob: formData.dob,
        tob: formData.tob,
        lob: formData.lob,
        gender: formData.gender,
        relation: formData.relation,
      };
  
      const result = await signUpWithEmail(
        requestData.name,
        requestData.email || 'unknown@gmail.com',
        requestData.password || 'defaultPassword123',
        requestData.dob,
        requestData.tob,
        requestData.lob,
        requestData.gender,
        requestData.relation
      );
  
      if (result.success) {
        setSignupComplete(true);
        setCurrentStep(totalSteps + 1);
  
        const response = await fetchInfo(requestData);
          setInfo(response);
          console.log(response)
       
      } else {
        console.error("Signup failed", result.message );
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

    

    return (
        <View className="w-full h-2/3 items-center justify-between bg-black"
        style={{
            flex: 1,
            backgroundColor: '#000'
        }}
        >
<View
  style={{
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 10,
  }}
>
{!signupComplete && (
  <TouchableOpacity onPress={goBack} 
  style={{
    display: currentStep === 1 ? 'none' : 'flex',
  }}
  >
    <View
      style={{
        padding: 10,
        backgroundColor: currentStep === 1 ? 'rgba(50, 50, 50, 0.5)' : 'rgba(50, 50, 50, 1)',
        borderRadius: 999,
      }}
    >
  <AntDesign
    name="left"
    size={24}
    color={currentStep === 1 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)'}
  />
    </View>
  </TouchableOpacity>
)}

  <Text
    style={{
      color: '#B2AFFE',
      fontSize: 30,
      fontFamily: 'Light',
    }}
  >
    {`${
      currentStep === 1
        ? 'ENTER THE NAME'
        : currentStep === 2
        ? 'DATE OF BIRTH'
          : currentStep === 3
        ? 'TIME OF BIRTH'
          : currentStep === 4
        ? 'LOCATION OF BIRTH'
          : currentStep === 5
        ? 'ADD GENDER'
          : currentStep === 6
        ? 'RELATIONSHIP STATUS'
        : 'ANALYZING YOUR INFO'
    }`}
  </Text>
</View>
            <View style={{
                flex: 1
            }}>

                {!signupComplete && (
                    <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                {[...Array(totalSteps)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flex: 1,
                                            height: 2,
                                            marginHorizontal: 4,
                                            backgroundColor: index < currentStep ? '#B2AFFE' : '#E0E0E0',
                                            borderRadius: 5,
                                        }}
                                    />
                                ))}
            </View>
                )}
            {currentStep === 1 && (
                    <Name
                        name={formData.name}
                        setName={(name: any) => setFormData((prev) => ({ ...prev, name }))}
                        goNext={goNext}
                    />
                )}
                {currentStep === 2 && (
                    <DOB
                        dob={formData.dob}
                        setDob={(dob: any) => setFormData((prev) => ({ ...prev, dob }))}
                        goNext={goNext}
                    />
                )}
                {currentStep === 3 && (
                    <TOB
                        tob={formData.tob}
                        setTob={(tob: any) => setFormData((prev) => ({ ...prev, tob }))}
                        goNext={goNext}
                    />
                )}
                {currentStep === 4 && (
                    <LOB
                        lob={formData.lob}
                        setLob={(lob: any) => setFormData((prev) => ({ ...prev, lob }))}
                        goNext={goNext}
                    />
                )}
                {currentStep === 5 && (
                    <Gender
                        gender={formData.gender}
                        setGender={(gender: any) => setFormData((prev) => ({ ...prev, gender }))}
                        goNext={goNext}
                    />
                )}
                {currentStep === 6 && (
                    <Relation
                        relation={formData.relation}
                        setRelation={(relation: any) => setFormData((prev) => ({ ...prev, relation }))}
                        goNext={handleSignUp}
                    />
                )}
                {currentStep === 7 && (
                          <Info userData={formData} 
                            info={info}
                    /> 

                )}
            </View>

      

        </View>
    );
}
