import axios from "axios";
import React, { use, useEffect } from "react";

import { useNavigate } from "react-router";
import { AuthContex } from "../Providers/AuthContex";

const axiosSecure = axios.create({
  // baseURL: "https://garments-server-orpin.vercel.app",
  baseURL: "http://localhost:5000",
  
});

const useAxiosSicures = () => {
  const { user, creatSingOut } = use(AuthContex);
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const resInterceptor = axiosSecure.interceptors.response.use(
      (respons) => {
        return respons;
      },
      (err) => {
      
        const errorStatus = err.status;
        if (errorStatus == 403 || errorStatus == 401) {
          creatSingOut().then(() => {
            // navigate("/logIn");
          });
        }

        return Promise.reject(err);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [creatSingOut, navigate, user]);

  return axiosSecure;
};

export default useAxiosSicures;
