import React, { useState } from 'react';
import { AppState, Text, TouchableOpacity, View } from 'react-native';

import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

import { supabase } from '@/lib/supabase';
import { signUpWithEmail } from '@/lib/auth';
import { useEffect } from 'react';

import Name from '@/components/Auth/Name';
import Email from '@/components/Auth/Email';
import Password from '@/components/Auth/Password';
import LOB from '@/components/Auth/lob';
import TOB from '@/components/Auth/tob';
import Gender from '@/components/Auth/gender';
import Relation from '@/components/Auth/relation';
import DOB from '@/components/Auth/dob';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function SignUp({
    setMode
}: any) {

    const [progress, setProgress] = useState(0);

    const { colorScheme } = useColorScheme();

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

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
            clearInterval(interval)
          }
        };
      }, [isLoading]);


    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signUpWithEmail(name, email, password, LOB, TOB, Gender, Relation, DOB);


        setIsLoading(false);
        clearForm();

        if (result.success) {
            setMode('signin');
        }
    }

    return (
        <View className={'flex w-full h-2/3 items-center justify-between'}>
            <View className={'flex w-full items-center justify-center flex-1'}>
                <Name
                    name={name}
                    setName={setName}
                />
 <DOB
                    name={name}
                    setName={setName}
                />

<TOB
                    name={name}
                    setName={setName}
                />

<LOB
                    name={name}
                    setName={setName}
                />

<Gender
                    name={name}
                    setName={setName}
                />

<Relation
                    name={name}
                    setName={setName}
                />

            

                <Email
                    mode={'signup'}
                    email={email}
                    setEmail={setEmail}
                    validity={isEmailValid}
                    setValidity={setIsEmailValid}
                />

                <Password
                    mode={'signup'}
                    password={password}
                    setPassword={setPassword}
                    validity={isPasswordValid}
                    setValidity={setIsPasswordValid}
                />
            </View>

            <View className={'flex w-full items-center gap-y-2 mb-5'}>
                <TouchableOpacity
                    className={'w-11/12 h-14 rounded-full flex justify-center items-center'}
                    style={{ backgroundColor: '#4B57B2' }}
                    onPress={handleSignUp}
                    disabled={isLoading || name.length === 0 || !isEmailValid || !isPasswordValid}
                >
                    {isLoading ? (
                           <View
                           style={{
                             alignItems: 'center',
                             justifyContent: 'center',
                             marginVertical: 20,
                           }}
                         >
                           <Text
                             style={{
                               fontSize: 36,
                               color: '#B2AFFE',
                               marginBottom: 10,
                               fontWeight: 'bold',
                             }}
                           >
                             {progress}%
                           </Text>
                           <View
                             style={{
                               width: '80%',
                               height: 8,
                               backgroundColor: '#B2AFFE', 
                               borderRadius: 5,
                               overflow: 'hidden',
                             }}
                           >
                             <LinearGradient
                               colors={['#d1c4e9', '#9575cd']}
                               start={{ x: 0, y: 0 }}
                               end={{ x: 1, y: 0 }}
                               style={{
                                 height: '100%',
                                 width: `${progress}%`,
                                 borderRadius: 5,
                               }}
                             />
                           </View>
                         </View>
                    ) : (
                        <Text className={'font-poppins-medium text-lg text-white text-center'}>
                            Register
                        </Text>
                    )}
                </TouchableOpacity>

                <View className='flex flex-row gap-1'>
                    <Text className={`font-poppins-medium text-md ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => setMode('signin')}>
                        <Text className={'font-poppins-medium text-md'} style={{ color: '#4B57B2' }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
