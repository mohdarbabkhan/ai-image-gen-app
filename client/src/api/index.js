import axios from "axios"

const API = axios.create({baseURL:'http://localhost:8000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
})
export const fetchPosts = () => API.get('/api/v1/post');
export const createPosts = (newPost) => API.post('/api/v1/post',newPost); 
export const signin = (formData) => API.post('/user/signin',formData);
export const signup = (formData) => API.post('/user/signup',formData);
export const googlelogin = (formData) => API.post('/user/googlelogin',formData)