import axios from 'axios';

const API_URL = 'https://678f678849875e5a1a91b27f.mockapi.io/houses';

export const fetchHouses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
