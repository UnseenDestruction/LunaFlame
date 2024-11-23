import axios from 'axios';

export async function fetchDreamResponse(userMessage: string) {
  try {
    const response = await axios.post(
      'http://192.168.5.122:3000/api/dream',
      { userMessage },
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

