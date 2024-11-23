import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';

export const uploadImage = async ({ fileUri, fileName }: any) => {
  try {
    console.log("Reading file from URI:", fileUri);

    const fileContents = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("File read successfully:", fileContents.slice(0, 100)); 

    const uint8Array = new Uint8Array(atob(fileContents).split('').map(char => char.charCodeAt(0)));

    const { data, error } = await supabase.storage
      .from('palm') 
      .upload(fileName, uint8Array, {
        contentType: 'image/jpeg',
        cacheControl: '3600', 
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('palm')
      .getPublicUrl(fileName);

    if (!publicUrlData) throw new Error('Failed to retrieve public URL.');

    return publicUrlData.publicUrl; 
  } catch (err) {
    console.error('Error uploading image to Supabase:', err);
    return null;
  }
};



