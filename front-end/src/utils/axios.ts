import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getDefaultAxiosConfig = (token: string | null) => {
  if (!token) return {};

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
