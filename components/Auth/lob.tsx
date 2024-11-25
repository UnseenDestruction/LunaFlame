import React from 'react';
import { TextInput, View, Text } from 'react-native';

import { useColorScheme } from 'nativewind';

export default function LOB({
    name,
    setName
}: any) {
    const { colorScheme } = useColorScheme();

    const handleNameChange = (text: string) => {
        setName(text);
    };

    return (
        <View className={'flex flex-col w-full gap-1 items-center mb-2'}>
            <View className={'flex flex-row w-10/12 justify-between'}>
                <Text className={`font-poppins-medium text-md ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                    Name
                </Text>
            </View>
            <TextInput
                value={name}
                onChangeText={handleNameChange}
                placeholder={'John Doe'}
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
