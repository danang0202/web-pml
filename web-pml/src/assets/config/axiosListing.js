import axios from 'axios';

const baseURL = 'https://2781-111-94-54-138.ngrok-free.app/';

const apiListing = axios.create({
    baseURL
});

export default apiListing;
