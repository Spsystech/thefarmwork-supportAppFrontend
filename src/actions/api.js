import axios from 'axios';

const baseURL = `${window.location.origin}/api`;
// const baseURL = `http://192.168.1.165:3000/api`;
export default axios.create({
  withCredentials: true,
  baseURL: baseURL,
});
