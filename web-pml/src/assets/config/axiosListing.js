import axios from 'axios';

const baseURL = 'https://e293-111-94-54-167.ngrok-free.app/';

const apiListing = axios.create({
    baseURL
});

export default apiListing;
