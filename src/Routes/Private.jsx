import React, { use } from "react";
import { AuthContex } from "../Providers/AuthContex";
import Loading from "../Extra/Loading";
import { Navigate, useLocation } from "react-router";

const Private = ({children}) => {
    const location=useLocation()
    const {user,loader}=use(AuthContex)
    if(loader){
     return <Loading></Loading>
    }
    if(!user){
      return <Navigate to="/login" state={location?.pathname}></Navigate>
    }
  return children 
};

export default Private;
