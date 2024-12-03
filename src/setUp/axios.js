import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

//set cookie after login success
instance.defaults.withCredentials = true;
// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN 12342";

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        case 401:
            return toast.error("Unauthorized the user. Please login");

        case 403:
            return toast.error("You don't have permisson to access this resource");
        default:
            return status;
    }

});

export default instance;