import axios from "axios";

//zodiac
export async function ZodiacRes(one: string, two: string) {
    try {
  
      console.log(one)
      console.log(two)
      const response = await axios.post(
        'http://192.168.5.122:3000/api/zodiac',
        { one, two },
        {
          headers: {
            'x-api-key': 'luna549', 
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dream response', error);
      throw error;
    }
  }