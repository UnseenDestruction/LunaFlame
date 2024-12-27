import axios from "axios";
import { supabase } from './supabase';


export async function fetchInfo(data: any) {


    try {
      const flatData = {
        name: data.name,
        email: data.email,
        password: data.password,
        dob: data.dob,
        time: data.tob,
        location: data.lob,
        gender: data.gender,
        relation: data.relation,
      };
  
      const response = await axios.post(
        'http://192.168.5.122:3000/api/info',
        flatData,
        {
          headers: {
            'x-api-key': 'luna549',
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response)
      return response.data;
      


    } catch (error) {
      console.error('Failed to fetch dream response', error);
      throw error;
    }
  }


  


  export async function addHoroscopeData(
    userId: string,
    horoscopeData: {
        ascendant: string;
        element: string;
        moon: string;
        name: string;
        sunSign: string;
        content: string;
        message: string;
        status: string;
    }
) {
    const { error } = await supabase
        .from('horoscope')
        .insert([{
            userId: userId,
            ascendant: horoscopeData.ascendant,
            element: horoscopeData.element,
            moon: horoscopeData.moon,
            name: horoscopeData.name,
            sunSign: horoscopeData.sunSign,
            content: horoscopeData.content,
            message: horoscopeData.message,
            status: horoscopeData.status,
        }]);

    if (error) {
        return { success: false, message: error?.message || 'Write to DB failed.' };
    }

    return { success: true };
}
