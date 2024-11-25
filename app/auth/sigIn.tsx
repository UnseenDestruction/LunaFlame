import React, { useState } from 'react';
import { AppState, Text, TouchableOpacity, View } from 'react-native';

import { useColorScheme } from 'nativewind';
import * as Progress from 'react-native-progress';

import { supabase } from '@/lib/supabase';
import { signInWithEmail } from '@/lib/auth';

import Email from '@/components/Auth/Email';
import Password from '@/components/Auth/Password';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function SignIn({
    navigation,
    setMode
}: any) {
    const { colorScheme } = useColorScheme();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const clearForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signInWithEmail(email, password);

        setIsLoading(false);
        clearForm();

        if (result.success) {
            navigation.navigate('Tab');
        }
    }

    return (
        <View className={'flex w-full h-2/3 items-center justify-between'}>
            <View className={'flex w-full items-center justify-center flex-1'}>
                <Email
                    mode={'signin'}
                    email={email}
                    setEmail={setEmail}
                    validity={isEmailValid}
                    setValidity={setIsEmailValid}
                />

                <Password
                    mode={'signin'}
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
                    onPress={handleSignIn}
                    disabled={isLoading || !isEmailValid || !isPasswordValid}
                >
                    {isLoading ? (
                        <Progress.Circle size={30} indeterminate={true} color={'#fff'} borderWidth={4}/>
                    ) : (
                        <Text className='font-poppins-medium text-lg text-white text-center'>
                            Login
                        </Text>
                    )}
                </TouchableOpacity>

                <View className={'flex flex-row gap-1'}>
                    <Text className={`font-poppins-medium text-md ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Don't have an account yet?
                    </Text>
                    <TouchableOpacity onPress={() => setMode('signup')}>
                        <Text className={'font-poppins-medium text-md'} style={{ color: '#4B57B2' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
