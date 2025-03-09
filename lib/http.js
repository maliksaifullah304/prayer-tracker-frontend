import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const apiInstance = axios.create({baseURL, withCredentials: true});

export default apiInstance;
