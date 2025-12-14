import React from 'react';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Track = () => {
  const navigate =useNavigate();
 const {id}=useParams();
 const axiosSicure = useAxiosSicures();
  const { data: product = [] } = useQuery({
    queryKey: ["Tracking",],
    queryFn: async () => {
      const res = await axiosSicure.get(
        `/my-tracking/${id}`,
      );
      return res.data;
    }
  });
 console.log('tracki',product)
 
    return (
        <div>
            <h2 className='text-center'>hello trck page{product.length}</h2>
            <div>
                <div className="p-6  min-h-screen">
<div className="max-w-4xl mx-auto shadow-lg rounded-xl p-4">
   <button
            onClick={()=>navigate(-1)}
            className="btn btn-sm btn-outline flex items-center gap-2 mb-3"
          >
            <IoMdArrowRoundBack /> Back
          </button>
<h2 className="text-2xl font-bold mb-4 text-center">
  Tracking Details</h2>


<div className="overflow-x-auto rounded-lg border ">
<table className="table w-full">
<thead className="bg-gray-100 text-gray-700">
<tr>
<th className="text-left">Location</th>
<th className="text-left">Note</th>
<th className="text-left">Date & Time</th>
<th className="text-left">Status</th>
</tr>
</thead>
<tbody>
{product.length === 0 ? (
<tr>
<td colSpan="4" className="text-center py-6 text-gray-500">
 Now  your order pending
</td>
</tr>
) : (
product.map((r, i) => (
<tr key={i} className="hover">
<td className="font-medium">{r.location}</td>
<td>{r.note}</td>
<td>{new Date(r.date).toLocaleString()}</td>
<td>
<span className="badge badge-info text-white">{r.status}</span>
</td>
</tr>
))
)}
</tbody>
</table>
</div>
</div>
</div>
            </div>
        </div>
    );
};

export default Track;