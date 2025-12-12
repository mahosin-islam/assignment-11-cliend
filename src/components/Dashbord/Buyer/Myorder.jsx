import React, { use } from 'react';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';
import { useQuery } from '@tanstack/react-query';
import { AuthContex } from '../../../Providers/AuthContex';
import Loading from '../../../Extra/Loading';

const Myorder = () => {

const {user}=use(AuthContex)
const axiosSicure=useAxiosSicures();
 const {isLoading, data:order}=useQuery({
    queryKey:["order", user?.email],
    queryFn: async()=>{
     const res=await axiosSicure?.get(`myorder-product?email=${user?.email}`)
      return res.data;
    }
 })
 if(isLoading){
  return  <Loading></Loading>
 }
console.log('data',order)

  return (
    <div>
      <h3>hell prod</h3>
    </div>
  );
};

export default Myorder;