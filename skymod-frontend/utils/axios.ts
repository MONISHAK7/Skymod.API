import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5159/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true only if you're using cookies
});

export default instance;
