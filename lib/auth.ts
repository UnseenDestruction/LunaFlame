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
    email: string | null | undefined, 
    password: string | null | undefined,
    dob: string,
    tob: string | null | undefined,
    lob: string,
    gender: string,
    relation: string
) {
    const sanitizedEmail = email || 'unknown@example.com';
    const sanitizedPassword = password || 'defaultPassword123';

    const { data: { user }, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: sanitizedPassword,
        options: {
            data: {
                name,
                dob: dob  || 'N/A',
                lob: lob  || 'N/A',
                tob: tob || 'N/A',
                gender,
                relation,
            },
        },
    });

    if (error || !user) {
        return { success: false, message: error?.message || 'Sign-up failed' };
    }

    const { data, error: sessionError } = await supabase.auth.getSession();

    console.log(data.session?.user.id)

    if (sessionError || !data.session?.user.id) {
        return { success: false, message: 'User not authenticated.' };
    }

    const userId = data.session.user.id;

   const  dbResponse =  await addUserToDatabase(
         userId,
        sanitizedEmail,
        name,
        dob  || 'N/A',
        tob || 'N/A',
        lob  || 'N/A',
        gender,
        relation
    );

    if (!dbResponse.success) {
        return { success: false, message: dbResponse.message }; 
    }

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
    userId: string, email: string | undefined, name: string | undefined, dob: string | undefined, tob: string | undefined, lob: string | undefined, gender: string | undefined, relation: string | undefined, ) {


    const { error } = await supabase
        .from('profile')
        .insert([{
            userId: userId,
            email: email,
            name: name,
            dob: dob,
            tob: tob,
            lob: lob,
            gender: gender,
            relation: relation,
        }]);

    if (error) {
        return { success: false, message: error?.message || 'Write to DB failed.' };
    }

    return { success: true };
}
