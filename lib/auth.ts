import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    password: string,
    dob: string,
    tob: string,
    lob: string,
    gender: string,
    relation: string
) {


    const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                Name: name,
                dob: dob,
                lob: lob,
                tob: tob,
                gender: gender,
                relation: relation

            }
        },
    });

    if (error || !user) {
        return { success: false, message: error?.message || 'Sign-up failed' };
    }

    await addUserToDatabase(
        user.id,
        email,
        name,
        dob,
        tob,
        lob,
        gender,
        relation
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
    Name: string | undefined,
    DOB: string | undefined,
    TOB: string | undefined,
    LOB: string | undefined,
    Gender: string | undefined,
    Relation: string | undefined
) {


    const { error } = await supabase
        .from('profile')
        .insert([{
            userId: userId,
            email: email,
            Name: Name,
            DOB: DOB,
            TOB: TOB,
            lastSignedIn: new Date().toISOString(),
        }]);

    if (error) {
        return { success: false, message: error?.message || 'Write to DB failed.' };
    }

    return { success: true };
}
