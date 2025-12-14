/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useAxiosSicures from "../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../Extra/Loading";
import useRole from "../../Hooks/useRole";
import { MdKeyboardBackspace } from "react-icons/md";
import useStatus from "../../Hooks/useStatus";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
const Dtails = () => {
  const { id } = useParams();
  const [images, setImages] = useState();
  const navigave = useNavigate();
  const axiosSicure = useAxiosSicures();
  const { role } = useRole();
  const { isLoading, status } = useStatus();
  // postApi-for-RoleChack
  const { isPending, data: product = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSicure.get(`/product/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (product?.Images) {
      setImages(product?.Images[0]);
    }
  }, [product]);

  if (isPending || isLoading) {
    return <Loading></Loading>;
  }
  const {
    Description,
    Images,
    MinimumOrder,
    ProductName,
    Payment,
    quantity,
    Category,
    price,
    _id,
    cratorEmail,
  } = product;
  const orderProduct = {
    ProductName,
    price,
    Payment,
    _id,
    MinimumOrder,
    quantity,
    cratorEmail,
    photo: images,
  };

  const handel = (data) => {
    setImages(data);
  };
  const handelNavigate = () => {
    navigave(-1);
  };
  const RemoveProduct = async (id) => {
    const res = await axiosSicure.delete(`/product/${id}`);
    console.log(res);
    if (res.data.deletedCount) {
      navigave("/");
    }
  };
  const handelSespend = () => {
      if (status == "pending") {
      return toast("not could no access order beacuse you are state pending");
    } else if (status === "suspend") {
      return toast("not could no access order beacuse you are suspend");
    }

     else{
      return toast("not could no access order beacuse you are suspend  and not approve");
  };
  }
  return (
    <div className="my-6 mx-4 md:mx-20 mt-30 rounded-xl border shadow-sm bg-base-100 transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        {/* LEFT IMAGE SECTION */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex justify-center items-center h-64 bg-base-200 rounded-xl shadow-inner">
            <img className="h-48 object-contain" src={images} alt="product" />
          </div>

          <div className="flex justify-center gap-3 mt-4 flex-wrap p-3 bg-base-200 rounded-xl border">
            {Images.map((img, index) => (
              <img
                onClick={() => handel(img)}
                className="h-20 w-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform border"
                key={index}
                src={img}
                alt="thumb"
              />
            ))}
          </div>
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="flex-1 border-t md:border-t-0 md:border-l p-5 md:p-8 space-y-4">
          <button
            onClick={handelNavigate}
            className="btn btn-sm btn-outline flex items-center gap-2 mb-3"
          >
            <IoMdArrowRoundBack /> Back
          </button>

          <h2 className="text-2xl font-bold">{ProductName}</h2>

          <div className="space-y-1 text-lg">
            <p>
              <span className="font-semibold">Minimum order:</span>{" "}
              {MinimumOrder}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {Category}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
          </div>

          <div className="py-4 border-y space-y-1">
            <p className="text-lg">
              Payment:{" "}
              <span className="text-amber-500 font-semibold">{Payment}</span>
            </p>
            <p className="opacity-80 leading-relaxed">
              Description: {Description}
            </p>
          </div>

          <div className="flex justify-between items-center py-3">
            <p className="text-3xl font-bold text-pink-500">${price}</p>

            {status === "approve" && role === "buyer" ? (
              <Link to="/Order" state={{ orderProduct }}>
                <button className="btn bg-amber-500 text-white text-lg font-semibold shadow hover:bg-amber-600">
                  Order
                </button>
              </Link>
            ) : (
              <button
                onClick={handelSespend}
                className="btn bg-amber-500 text-white text-lg font-semibold shadow hover:bg-amber-600"
              >
                Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dtails;
