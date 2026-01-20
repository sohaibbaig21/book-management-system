import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1';
const OPEN_LIBRARY_API = 'https://openlibrary.org';

export const googleBooksApi = axios.create({
  baseURL: GOOGLE_BOOKS_API,
  timeout: 10000,
});

export const openLibraryApi = axios.create({
  baseURL: OPEN_LIBRARY_API,
  timeout: 10000,
});

// Add request interceptor for error handling
const handleRequest = (config) => config;
const handleRequestError = (error) => Promise.reject(error);

// Add response interceptor for error handling
const handleResponse = (response) => response;
const handleResponseError = (error) => {
  if (error.response) {
    // Server responded with error
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.message);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};

googleBooksApi.interceptors.request.use(handleRequest, handleRequestError);
googleBooksApi.interceptors.response.use(handleResponse, handleResponseError);

openLibraryApi.interceptors.request.use(handleRequest, handleRequestError);
openLibraryApi.interceptors.response.use(handleResponse, handleResponseError);