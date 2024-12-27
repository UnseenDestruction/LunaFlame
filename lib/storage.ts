import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';
import { Buffer } from 'buffer';

global.Buffer = global.Buffer || Buffer;

export const uploadImage = async ({ fileUri, fileName }: any) => {
  try {
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError || !data?.user) {
      throw new Error('Failed to fetch authenticated user. Please log in.');
    }

    const userId = data.user.id;

    console.log("File URI:", fileUri);
    console.log("File Name:", fileName);
    console.log("User ID:", userId);

    const fileContents = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const uint8Array = new Uint8Array(Buffer.from(fileContents, 'base64'));

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('palm')
      .upload(fileName, uint8Array, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
      });

    if (uploadError) throw uploadError;


    const { data: publicUrlData, } = supabase.storage
      .from('palm')
      .getPublicUrl(fileName);
   


    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error('Error uploading image to Supabase:', err.message, err.stack);
    return null;
  }
};
