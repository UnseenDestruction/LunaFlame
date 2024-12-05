import React from 'react';
import { TextInput, View, Text } from 'react-native';

import { useColorScheme } from 'nativewind';

export default function Email({
    mode,
    email,
    setEmail,
    validity,
    setValidity,
    goNext

}: any) {
    const { colorScheme } = useColorScheme();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setValidity(emailRegex.test(text));
    };

    return (
        <View className={'flex flex-col w-full gap-1 items-center mb-2'}>
            <View className={'flex flex-row w-10/12 justify-between'}>
                <Text className={`font-poppins-medium text-md ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Email
                </Text>

                {mode !== 'signin' && !validity && email.length >= 1 && (
                    <Text className={'font-poppins-medium text-md'} style={{ color: '#FF5656' }}>
                        Input Valid Email
                    </Text>
                )}
            </View>
            <TextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder={'johndoe@gmail.com'}
                placeholderTextColor={'gray'}
                autoCapitalize={'none'}
                className={'h-14 w-11/12 rounded-full font-poppins-medium text-md pl-5'}
                style={{
                    backgroundColor: colorScheme === 'dark' ? '#21273B' : '#FFFFFF',
                    color: colorScheme === 'dark' ? '#ffffff' : '#293032',
                }}
            />
        </View>
    )
}
