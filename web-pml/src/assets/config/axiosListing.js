import axios from 'axios';

const baseURL = 'https://capi.pkl63.stis.ac.id/';

const apiListing = axios.create({
    baseURL
});

export default apiListing;
