import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContex } from '../Providers/AuthContex';
import useAxiosSicures from './useAxiosSicure';

const useRole = () => {
  const { user } = use(AuthContex);
  
  const axiosSicure=useAxiosSicures();
 const {isLoading, data:role=""}=useQuery({
    queryKey:["userRole", user?.email],
    queryFn: async()=>{
     const res=await axiosSicure?.get(`user-role?email=${user?.email}`)
      return res.data?.Role || "";

    }
 })

    return {isLoading,role}
};

export default useRole;