import React, { useState } from "react";
// import useAxiosSicures from '../../../Hooks/useAxiosSicure';
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { Link } from "react-router";

const Allorders = () => {
  const axiosSicure = useAxiosSicures();
   const [search, setSearch] = useState("");
    

  const { data: order = [] } = useQuery({
    queryKey: ["userData",search],
    queryFn: async () => {
      const res = await axiosSicure.get(`/searc-orders?searchText=${search}`);
      return res.data;
    },
  });
 
 console.log('drop',)
  return (
    <div>
      <div className="text-center my-3 rotate-xl">
         <label className="my-2">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search user"
          className="input"
        />
      </label> 
       
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:pl-10">
            <thead>
              <tr>
                <th>OId</th>
                <th>user</th>
                <th>product</th>
                <th>quantity</th>
                <th>status</th>
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

                  <td>
                    <Link to={`/dashboard/Order-dtails/${card._id}`}>
                      <button className="btn bg-pink-500">Dtail-order</button>
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

export default Allorders;
