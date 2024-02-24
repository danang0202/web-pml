import axios from 'axios';

const baseURL = 'https://central.pkl63.stis.ac.id';

const apiCentral = axios.create({
  baseURL
});

export default apiCentral;
