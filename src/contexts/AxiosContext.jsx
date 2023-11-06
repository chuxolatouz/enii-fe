import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';

export const AxiosContext = createContext();

export function AxiosProvider({ children }) {
  const BASE_URL = 'http://127.0.0.1:5000/';

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

    return axios.create({
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
