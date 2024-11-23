import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { generateStripeId } from '@/lib/stripe';

export async function signInWithEmail(
    email: string,
    password: string
) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    const { error: updateError } = await supabase
        .from('profile')
        .update({ lastSignedIn: new Date().toISOString() })
        // @ts-ignore
        .eq('userId', data.user.id);

    if (error || !data.user || updateError) {
        return { success: false, message: error?.message || 'Sign-in failed' };
    }

    await AsyncStorage.setItem('id', data.user.id);
    return { success: true };
}

export async function signUpWithEmail(
    name: string,
    email: string,
    password: string
) {
    const [lastName, ...nameParts] = name.trim().split(' ').reverse();
    const firstName = nameParts.reverse().join(' ');

    const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        },
    });

    if (error || !user) {
        return { success: false, message: error?.message || 'Sign-up failed' };
    }

    await addUserToDatabase(
        user.id,
        email,
        firstName,
        lastName,
    );

    return { success: true };
}

export async function signOutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { success: false, message: error?.message || 'Sign-out failed' };
    }

    await AsyncStorage.setItem('id', '');
    return { success: true };
}

export async function addUserToDatabase(
    userId: string | undefined,
    email: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined
) {


    const { error } = await supabase
        .from('profile')
        .insert([{
            userId: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            systemLanguage: 'English (US)',
            systemLocale: 'en-US',
            targetLanguage: 'English (US)',
            targetLocale: 'en-US',
            difficulty: '',
            avatar: '',
            subscriptionId: '',
            subscriptionType: 'FREE',
            subscriptionStart: null,
            subscriptionEnd: null,
            lastSignedIn: new Date().toISOString(),
            write: 0,
            speak: 0,
            listen: 0,
            read: 0,
            mistakes: [],
            history: [],
            premiumVoiceUsage: 0,
            premiumVoiceQuota: 0,
            streak: 0,
            streakUpdated: new Date().toISOString()
        }]);

    if (error) {
        return { success: false, message: error?.message || 'Write to DB failed.' };
    }

    return { success: true };
}
