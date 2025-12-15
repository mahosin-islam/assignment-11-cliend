import React, { use } from 'react';
import { AuthContex } from '../../../Providers/AuthContex';
import Loading from '../../../Extra/Loading';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';


const Trackorder = () => {

const {user}=use(AuthContex)
const axiosSicure=useAxiosSicures();
 const {isLoading, data:order=[]}=useQuery({
    queryKey:["order", user?.email],
    queryFn: async()=>{
     const res=await axiosSicure?.get(`myorder-product?email=${user?.email}`)
      return res.data;
    }
 })
 if(isLoading){
  return  <Loading></Loading>
 }
  return (
    <div>
      <h3 className='text-center'>My  order track {order.length}</h3>
      <div>
         <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>orId</th>
                <th>user</th>
                <th>product</th>
                <th>quantity</th>
                <th>Payment</th>
                <th>Track</th>
                <th>Dtails</th>
               
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {order.map((card, index) => (
                <tr key={index} card={card}>
                  <th>{card.trackingId} </th>
                  <td>{card.FirstName}</td>
                  <td>{card.ProductName}</td>
                  <td>{card.OrderQuantite}</td>
                  <td>{card.status}</td>
                  <td>
                     <Link to={`/dashboard/Tracking/${card.trackingId}`}>
                    <button className='btn'>Track order</button></Link>
                  </td>
                   <Link to={`/dashboard/Order-dtails/${card._id}`}>
                      <td>
                        <button className='btn btn-primary'>Dtail</button>
                      </td></Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trackorder;











