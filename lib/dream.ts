import axios from 'axios';

export async function fetchDreamResponse(userMessage: string) {
  try {
    const response = await axios.post('http://192.168.5.122:3000/api/dream', {
      userMessage
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch dream response', error);
    throw error;
  }
}
