
import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxiosSicures from './useAxiosSicure';
import { AuthContex } from '../Providers/AuthContex';

const useSuspen = () => {
  const { user } = use(AuthContex);
  
  const axiosSicure=useAxiosSicures();
 const {isLoading, data:suspen=[]}=useQuery({
    queryKey:["suspen", user?.email],
    queryFn: async()=>{
     const res=await axiosSicure?.get(`suspens-info?email=${user?.email}`)
      return res.data;

    }
 })

    return {isLoading,suspen}
};

export default useSuspen;







