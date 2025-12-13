import React, { use } from 'react';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContex } from '../../../Providers/AuthContex';
import Loading from '../../../Extra/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Myorder = () => {

const {user}=use(AuthContex)
const queryClient = useQueryClient();
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
console.log('data',order)



  const handelCanselOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to do cancel !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSicure.delete(`Cancel-order/${id}`);

        queryClient.invalidateQueries();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been don",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };




  return (
    <div>
      <h3>my order {order.length}</h3>
      <div>
         <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>orId</th>
                <th>user</th>
                <th>product</th>
                <th>quantity</th>
                <th>status</th>
                <th>Payment</th>
                <th>state</th>
                <th>Action</th>
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
                  <td>{card.PaymentType}</td>
                 <td>
                   
                         {card.status=="Pending"?
                         <button 
                         onClick={()=>handelCanselOrder(card._id)}
                         className='btn bg-amber-300'>
                            Cancel
                         </button>:""}
                     
                 </td>
                  <td>
                   
                     <Link to={`/dashboard/Order-dtails/${card._id}`}>
                      <button className="btn ">View dtail</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myorder;





