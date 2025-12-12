
import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSicures from './useAxiosSicure';
import { AuthContex } from '../Providers/AuthContex';

const useStatus = () => {
  const { user } = use(AuthContex);
  
  const axiosSicure=useAxiosSicures();
 const {isLoading, data:status="pending"}=useQuery({
    queryKey:["userStatus", user?.email],
    queryFn: async()=>{
     const res=await axiosSicure?.get(`user-role?email=${user?.email}`)
      return res.data?.status || "pending";

    }
 })

    return {isLoading,status}
};

export default useStatus;



