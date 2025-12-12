import React, { use, useState } from "react";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { AuthContex } from "../../../Providers/AuthContex";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Manageproduct = () => {
  const queryClient = useQueryClient();
  const { user } = use(AuthContex);
  const [search, setSearch] = useState("");
  const axiosSicure = useAxiosSicures();
  const {  data: product=[] } = useQuery({
    queryKey: ["product", search, user?.email],
    queryFn: async () => {
      const res = await axiosSicure?.get(
        `manager-product?email=${user?.email}&search=${search}`
      );
      return res.data;
    },
  });


  const handelRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to do delete !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSicure.delete(`Delet-prodcut/${id}`);

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
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra px-10">
          <thead>
            <tr>
              <th>phot</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment-model</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {product?.map((card, index) => (
              <tr key={index} card={card}>
                <th className="w-10  rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={card.Images}
                    alt="Tailwind CSS Navbar component"
                  />
                </th>

                <td>{card.ProductName}</td>
                <td>{card.price}</td>

                <td>{card.Payment}</td>

                <td className="flex gap-4">
                  <button
                    onClick={() => handelRemove(card._id)}
                    className="btn bg-pink-500"
                  >
                    delete
                  </button>
                  <Link to={`/dashboard/Update/${card._id}`}>
                    <button className="btn btn-accent">update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageproduct;
