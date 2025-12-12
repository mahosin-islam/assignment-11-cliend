/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useAxiosSicures from "../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../Extra/Loading";
import useRole from "../../Hooks/useRole";
import { MdKeyboardBackspace } from "react-icons/md";
import useStatus from "../../Hooks/useStatus";
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
    photo:images,
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

  return (
    <div className="my-5 flex flex-col md:flex-row border-2 min-h-100 mx-20">
      <div className="flex-1 image-are">
        <div className="h-2/3 flex items-center justify-center ">
          <img className="h-40" src={images} alt="product" />
        </div>
        <div className="h-1/3 border-t-2  flex justify-center gap-3">
          {Images.map((img, index) => (
            <img
              onClick={() => handel(img)}
              className="h-20 "
              key={index}
              src={img}
              alt="phot"
            />
          ))}
        </div>
      </div>

      <div className="info-area  flex-1  pl-2 border-l-2">
        <div className="md:gap-10 flex-1">
          <span className="cursor-pointer flex items-center gap-3">
            <MdKeyboardBackspace />
            <span
              onClick={handelNavigate}
              className="text-green-500 cursor-pointer"
            >
              Go back
            </span>
          </span>
          {/* Plant Info */}

          <hr className="my-6" />
          <div
            className="
         "
          >
            <h2>Title: {ProductName}</h2>
          </div>
          <hr className="my-1" />

          <div>
            <h2>Minimum order:{MinimumOrder}</h2>
            <h2>Category:{Category}</h2>
            <h2>contity:{quantity}</h2>
          </div>
          <hr className="my-6" />
          <div>
            <div className="py-1">
              Payment <span className="text-amber-400"> {Payment}</span>
            </div>
            <p>Discription:{Description}</p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-pink-500">Price: {price}$</p>

            {role == "buyer" && status == "approve" ? (
              <Link to="/Order" state={{ orderProduct }}>
                <button
                  className="btn btn-primay bg-amber-400 text-[18px] text-white
       font-semibold"
                >
                  Order
                </button>
              </Link>
            ) : (
              ""
            )}

            <div>
              {/* <Button onClick={() => setIsOpen(true)} label="Purchase" /> */}
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-5 mb-3">
            <button
              onClick={() => RemoveProduct(_id)}
              className="btn btn-primary"
            >
              Delet
            </button>
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dtails;
