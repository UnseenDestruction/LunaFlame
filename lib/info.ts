import axios from 'axios';

export async function fetchInfo(data: any) {
  try {
    const response = await axios.post(
      'http://192.168.5.122:3000/api/info',
      { data },
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

