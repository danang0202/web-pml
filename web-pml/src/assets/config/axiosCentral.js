import axios from 'axios';

const baseURL = 'http://localhost:8989'; 

const apiCentral = axios.create({
  baseURL
});

export default apiCentral;
