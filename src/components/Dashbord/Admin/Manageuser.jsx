import React, { useRef, useState } from "react";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Manageuser = () => {
  const axiosSicure = useAxiosSicures();
  const queryClient = useQueryClient();
  const [suspend, setSuspend] = useState(null);
  const riderModelRef = useRef();
 const navigate =useNavigate();
  const { isLoading, data: product = [] } = useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
      const res = await axiosSicure.get("/user");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
 
  //mdelShow
  const handelShowModel = (data) => {
    riderModelRef.current.showModal();
    setSuspend(data)  
 };

 const statusAproad = async () => {
    const approve = "approve";
    const res = await axiosSicure.patch(`/user-status/${suspend._id}`, {
      approve,
    });
    if (res.data.modifiedCount) {
      toast("sucesfu apdate approve");
      queryClient.invalidateQueries();
      riderModelRef.current.close();
    }
  };
       const handelSuspen=()=>{
          navigate('/Suspend',{state:{suspend}})
           riderModelRef.current.close();
       }

  return (
    <div>
      <div className="text-center">
        <h2>user items: {product.length}</h2>
        <h2>hell manageuser page for admin</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product.map((card, index) => (
                <tr card={card} key={index}>
                  <th>{index + 1} </th>
                  <td>{card.Name}</td>
                  <td>{card.Email}</td>
                  <td>{card.Role}</td>
                  <td>
                               
                     {card?.Role=="admin"?
                     <button
                      className="text-green-400"
                     >Not Acces</button>:
                       <button
                            onClick={() =>handelShowModel(card)}
                            className="btn bg-amber-300"
                          >
                           {card?.status}
                          </button>
                     
                     }



                        
                      
                      
              
                  
                  </td>
                   
                  
                </tr>
              ))}
            </tbody>
          </table>
          {/*open Moder */}

          <dialog
            ref={riderModelRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
                 <div className="flex gap-5">
                    <button 
                    className="btn bg-green-400"
                  onClick={statusAproad}
                  > approve</button>
                  <button 
                  onClick={handelSuspen}
                  className="btn bg-amber-400"
                  >suspend</button>
                 </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* close modarl */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/*end Moder */}
        </div>
      </div>
    </div>
  );
};

export default Manageuser;



//  onClick={() =>handelShowModel(card)}