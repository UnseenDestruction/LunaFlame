import axios from "axios";
import { supabase } from './supabase';


export async function fetchInfo(datas: any) {

      const { data, error: sessionError } = await supabase.auth.getSession();
      const userId = data?.session?.user?.id || "";

    try {
      const flatData = {
        name: datas.name,
        email: datas.email,
        password: datas.password,
        dob: datas.dob,
        time: datas.tob,
        location: datas.lob,
        gender: datas.gender,
        relation: datas.relation,
        userId: userId
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


  

