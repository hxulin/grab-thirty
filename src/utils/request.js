import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default instance;
