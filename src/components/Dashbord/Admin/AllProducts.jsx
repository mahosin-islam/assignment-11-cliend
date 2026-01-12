import React from "react";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import { HiCheckCircle } from "react-icons/hi2";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2";
const AllProducts = () => {
  const axiosSicure = useAxiosSicures();
  const queryClient = useQueryClient();
  const { isLoading, data: product = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSicure.get("/product");
      return res.data;
    },
  });


  if (isLoading) {
    return <Loading></Loading>;
  }
  const showHome = async (card) => {
    const isHome = card.Homepage;
    const Homepage = !isHome;
    const res = await axiosSicure.patch(`/product/${card._id}`, { Homepage });
    if (res.data.modifiedCount) {
      toast("successful you post");
      queryClient.invalidateQueries();
    }
  };

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
      <h2 className=" text-center text-2xl py-3">
        Allporduct products {product.length}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:pl-10">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Show-Home</th>
                <th>Action</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {product.map((card, index) => (
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
                  <td>{card.Category}</td>
                  <td>
                    {card?.Homepage == false ? (
                      <button
                        className="text-2xl text-amber-400"
                        onClick={() => showHome(card)}
                      >
                        <IoMdCloseCircle />
                      </button>
                    ) : (
                      <button
                        onClick={() => showHome(card)}
                        className="text-2xl text-green-400"
                      >
                        <HiCheckCircle />
                      </button>
                    )}
                  </td>
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
      </div>
    </div>
  );
};

export default AllProducts;
