import React, { use, useEffect, useRef, useState } from "react";
import { AuthContex } from "../../../Providers/AuthContex";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Approveorder = () => {
  const { user } = use(AuthContex);
  const riderModelRef = useRef();
  const [tracking, setTracking] = useState(null);
  const [trackingData, setTrackingData] = useState({
    location: "",
    note: "",
    date: "",
    status: "",
  });

  const axiosSicure = useAxiosSicures();
  //   const queryClient = useQueryClient();
  const { data: product = [] } = useQuery({
    queryKey: ["product", "Approved", user?.email],
    queryFn: async () => {
      const res = await axiosSicure?.get(
        `/manage-Approved?status=Approved&email=${user?.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {}, []);

  const handelShowModel = (card) => {
    riderModelRef.current.showModal();
    setTracking(card);

    console.log("ida", tracking);
  };
  const handelSubmited = async (e) => {
    e.preventDefault();
    const TrackingInfo = {
      trackingId: tracking.trackingId,
      location: trackingData.location,
      note: trackingData.note,
      status: trackingData.status,
      date: new Date(),
    };
  
    const res = await axiosSicure.post("/trackin", TrackingInfo);
    console.log("post reslt", res);
    toast("post tracking id");
    e.target.reset() 
    riderModelRef.current.close();
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
                <th>Tracking</th>
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
                      className="btn bg-amber-400 mr-2"
                      onClick={() => handelShowModel(card)}
                    >
                      Add Tracking
                    </button>
                  </td>
                  <td>
                    <Link to={`/dashboard/Tracking/${card.trackingId}`}>
                      <button className="btn bg-green-400">view</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="modal">
            <dialog
              ref={riderModelRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form onSubmit={handelSubmited}>
                  <label htmlFor="">location</label>
                  <input
                    type="text"
                    className="field ml-5"
                    placeholder="Locn"
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        location: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <label htmlFor="">Note</label>
                  <input
                    type="text"
                    className="ml-5"
                    placeholder="Note"
                    onChange={(e) =>
                      setTrackingData({ ...trackingData, note: e.target.value })
                    }
                  />{" "}
                  <br />
                  <select
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Cutting Completed</option>
                    <option>Sewing Started</option>
                    <option>Finishing</option>
                    <option>QC Checked</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                  </select>
                  <button className="ml-5 btn btn-primary" type="submit">
                    Save
                  </button>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* close modarl */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approveorder;
