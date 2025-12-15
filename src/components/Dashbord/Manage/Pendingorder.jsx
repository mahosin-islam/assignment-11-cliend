import React, { use } from "react";
import { AuthContex } from "../../../Providers/AuthContex";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import useStatus from "../../../Hooks/useStatus";

const Pendingorder = () => {
  const { user } = use(AuthContex);
  const navigate =useNavigate();
  const {status: userStatus}=useStatus();
  const axiosSicure = useAxiosSicures();
  const queryClient = useQueryClient();
  const { data: product = [] } = useQuery({
    queryKey: ["product", "pending", user?.email],
    queryFn: async () => {
      const res = await axiosSicure?.get(
        `/manage-pending?status=Pending&email=${user?.email}`
      );
      return res.data;
    },
  });

  const handelApproved = async (id) => {
    if(userStatus=="suspend"){
      navigate('/dashboard/Myprofile')
      return toast('you are suspend not access Approbed')
    }
    const payload  = { status: "Approved" };
    const res = await axiosSicure.patch(`/order-Approved/${id}`,payload );
    if (res.data.modifiedCount) {
      toast("you status Approved");
      queryClient.invalidateQueries();
    }
  };

  const handelRejected = async (id) => {
       if(userStatus=="suspend"){
        navigate('/dashboard/Myprofile')
      return toast('you are suspend not access Reject')
    }
    const payload = { status: "Rejected" };
    const res = await axiosSicure.patch(`/order-Rejected/${id}`,payload);
    if (res.data.modifiedCount) {
      toast("you status Rejected");
      queryClient.invalidateQueries();
    }
  };

  return (
    <div>
      <h2 className="text-center">
        Pendingorder page for manager{product.length}
      </h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra px-10">
            <thead>
              <tr>
                <th>OrID</th>
                <th>User</th>
                <th>Product</th>
                <th>quntity</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
                <th>view dtails</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product?.map((card, index) => (
                <tr key={index} card={card}>
                  <th>{card.trackingId}</th>

                  <td>{card.FirstName}</td>
                  <td>{card.ProductName}</td>
                  <td>{card.OrderQuantite}</td>

                  <td>{new Date(card.createdAt).toLocaleString()}</td>
                  <td>{card.status}</td>
                  <td className="flex gap-4">
                    <button
                      onClick={() => handelApproved(card._id)}
                      className="btn bg-amber-400 mr-2"
                    >
                      Approved
                    </button>

                    <button
                      className="btn bg-amber-400 ml-2"
                      onClick={() => handelRejected(card._id)}
                    >
                      Rejected
                    </button>
                  </td>
                  <td>
                    <Link to={`/dashboard/Order-dtails/${card._id}`}>
                      <button className="btn bg-green-400">view</button>
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

export default Pendingorder;
