import axios from "axios";

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



  export async function HoroScope(data: any) {


    try {
      const response = await axios.post(
        'http://192.168.5.122:3000/api/horoscope',

        {
          headers: {
            'x-api-key': 'luna549',
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data;
      


    } catch (error) {
      console.error('Failed to fetch dream response', error);
      throw error;
    }
  }

  
