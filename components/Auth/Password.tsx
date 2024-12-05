import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

import { useColorScheme } from 'nativewind';

import Show from '@/assets/images/auth/Show.svg';
import ShowDark from '@/assets/images/auth/ShowDark.svg';
import Hide from '@/assets/images/auth/Hide.svg';
import HideDark from '@/assets/images/auth/HideDark.svg';

export default function Password({
    mode,
    password,
    setPassword,
    validity,
    setValidity
}: any) {
    const { colorScheme } = useColorScheme();

    const isLengthValid = password.length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setValidity(passwordRegex.test(text));
    };

    const [isMasked, setIsMasked] = useState(true);

    const handleForgotPass = () => {

    };

    return (
        <View className={'flex flex-col w-full gap-1 items-center mb-2'}>
            <View className={'flex flex-row w-10/12 justify-between'}>
                <Text className={`font-poppins-medium text-md ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Password
                </Text>

                {mode !== 'signin' && !isLengthValid && password.length > 0 && (
                    <Text className={'font-poppins-medium text-md'} style={{ color: '#FF5656' }}>
                        Must be at least 8 characters
                    </Text>
                )}
                {mode !== 'signin' && isLengthValid && !hasCapitalLetter && password.length > 0 && (
                    <Text className={'font-poppins-medium text-md'} style={{ color: '#FF5656' }}>
                        Must have 1 Capital letter
                    </Text>
                )}
                {mode !== 'signin' && isLengthValid && hasCapitalLetter && !hasNumber && password.length > 0 && (
                    <Text className={'font-poppins-medium text-md'} style={{ color: '#FF5656' }}>
                        Must have 1 Number
                    </Text>
                )}
            </View>
            <View className={'relative w-full flex items-center justify-center'}>
                <TextInput
                    secureTextEntry={isMasked}
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder={'•••••••••••'}
                    placeholderTextColor={'gray'}
                    autoCapitalize={'none'}
                    className={'h-14 w-11/12 rounded-full font-poppins-medium text-md pl-5'}
                    style={{
                        backgroundColor: colorScheme === 'dark' ? '#21273B' : '#FFFFFF',
                        color: colorScheme === 'dark' ? '#ffffff' : '#293032',
                    }}
                />
                <TouchableOpacity className={'absolute right-10'} onPress={() => setIsMasked(prevState => !prevState)}>
                    {isMasked ? (
                        colorScheme === 'dark' ? <ShowDark width={25} height={25}/> : <Show width={25} height={25}/>
                    ) : (
                        colorScheme === 'dark' ? <HideDark width={25} height={25}/> : <Hide width={25} height={25}/>
                    )}
                </TouchableOpacity>
            </View>
            {mode === 'signin' && (
                <TouchableOpacity className={'flex flex-row w-10/12 justify-end'} onPress={handleForgotPass}>
                    <Text className={'font-poppins-medium'} style={{ color: '#4B57B2' }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
