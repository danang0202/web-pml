import axios from 'axios';

const baseURL = 'https://central.pkl63.stis.ac.id/v1/projects/6/';

const apiCentralProject = axios.create({
  baseURL
});

export default apiCentralProject;
