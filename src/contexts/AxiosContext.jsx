import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const AxiosContext = createContext();

export function AxiosProvider({ children }) {
  const BASE_URL = process.env.NEXT_APP_BACKEND;
  const router = useRouter();
  const token = localStorage.getItem('token');
  
  const api = useMemo(() => {

    const requestHeaders = {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    };

    // Add Authorization header if we have a token
    if (token && token != '') {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: requestHeaders,
      transformRequest: [(data, headers) => {
        if (data instanceof FormData) {
          // Set Content-Type to multipart/form-data

          // eslint-disable-next-line no-param-reassign
          headers['Content-Type'] = 'multipart/form-data';
          return data;
        }
        return JSON.stringify(data);
      }],
    });

    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 403) {
          // Eliminar el token y redireccionar a la página de inicio de sesión
          localStorage.removeItem('token');
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [BASE_URL]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AxiosContext.Provider value={{ api }}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useApi() {
  return useContext(AxiosContext);
}
