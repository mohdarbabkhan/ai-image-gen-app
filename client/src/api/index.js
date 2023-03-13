import axios from "axios"

const url = 'https://dall-e-8y9s.onrender.com/api/v1/post';

export const fetchPosts = () => axios.get(url);
export const createPosts = (newPost) => axios.post(url,newPost); 
