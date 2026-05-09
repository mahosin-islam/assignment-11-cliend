import React from 'react'
import useAxiosSicures from '../../../../Hooks/useAxiosSicure';
import Loading from '../../../../Extra/Loading';
import { useQuery } from '@tanstack/react-query';
import AllCard from '../../AllProducts/AllCard';

export default function Childern() {
 const axiosSicure = useAxiosSicures();
  const { isLoading, data: Child = [] } = useQuery({
   queryKey: ["Childern"], 
   queryFn: async () => {
    const res = await axiosSicure.get('/category', {
      params: {Gender: 'Child'}
    });
    return res.data;
  },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className='my-5 '>
        
         <div className="px-5 md:px-10  ">
          <h2 className="text-2xl font-bold left-3 py-3">Childern Colections</h2>
      <div className="

  grid 
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  gap-4">
        {Child.map((card) => (
          <AllCard key={card._id} card={card}></AllCard>
        ))}
      </div>
    </div>
        
    </div>
  )
}






