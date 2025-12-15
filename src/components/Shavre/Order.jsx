import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import useAxiosSicures from "../../Hooks/useAxiosSicure";
import { AuthContex } from "../../Providers/AuthContex";
import Loading from "../../Extra/Loading";

const Order = () => {
  const axiosSicure = useAxiosSicures();
  const { user } = use(AuthContex);
  const [minorder, setMinorde] = useState(0);
  const navigate = useNavigate();
  //order-product info
  const { state } = useLocation();
  const orderProduct = state?.orderProduct;
  const { ProductName, price, Payment, _id,cratorEmail, MinimumOrder, quantity, photo } =
    orderProduct;
  useEffect(() => {
    setMinorde(MinimumOrder);
  }, [MinimumOrder]);
  // react form submit
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();
  

  //tanstack-quears-section
  const { isPaused, isError, mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post("/orders", data),

    onSuccess: () => {
      toast("succes full your order");
      navigate("/dashboard/My-order");
    },
    onError: (err) => {
      console.log("error", err);
    },
    onMutate: () => {
      console.log("i will post this data");
    },
    onSettled: (error) => {
      if (error) {
        console.log(error);
      }
    },
    retry: 3,
  });
  if (isPaused) {
    return <Loading></Loading>;
  }
  if (isError) {
    return toast("you post request fail");
  }
  // addd product
  const addProduct = async (data) => {
    const {
      FirstName,
      LastName,
      MinimumQuantity,
      ContactNumber,
      DeliveryAddress,
    } = data;
    const quantite = parseInt(MinimumQuantity);
    const Amount = parseInt(price);
    const total = quantite * Amount;
    const orderInfo = {
      OrderEmail: user?.email,
      cratorEmail:cratorEmail,
      ProductName: ProductName,
      Price: total,
      ProductId: _id,
      PaymentType: Payment,
      OrderQuantite: quantite,
      quantity: quantity,
      FirstName: FirstName,
      LastName: LastName,
      ContactNumber: ContactNumber,
      DeliveryAddress: DeliveryAddress,
      photo: photo,
      status: "Pending",
    };
    try {
      if (Payment == "Cash on Delivery") {
        await mutateAsync(orderInfo);
      } else if (Payment == "PayFast") {
        const res = await axiosSicure.post(
          "/payment-checkout-session",
          orderInfo
        );
        // window.location.href = res.data.url;
        window.location.assign(res.data.url);
      }
    } catch (err) {
      console.log("wourd you add plant", err.message);
    }

    reset();
  };
  return (
    <div>
      <h1>minorde is ={minorder}</h1>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(addProduct)}>
                <fieldset className="fieldset">
                  <span>
                    <label className="label">First Name</label>

                    <input
                      type="text"
                      {...register("FirstName", { required: true })}
                      className="input w-full"
                      placeholder="FirstName"
                    />
                    {errors.FirstName?.type == "required" && (
                      <p className="text-red-500">FirstName is required</p>
                    )}
                  </span>
                  <span>
                    <label className="label">LastName </label>
                    <input
                      type="text"
                      {...register("LastName", { required: true })}
                      className="input w-full"
                      placeholder="LastName"
                    />
                    {errors.LastName?.type == "required" && (
                      <p className="text-red-500">Price is required</p>
                    )}
                  </span>

                  <span>
                    <label className="label">MinimumQuantity</label>
                    <input
                      type="number"
                      {...register("MinimumQuantity", {
                        required: true,
                        min: {
                          value: minorder || 0,
                          message: `Minimum at least ${minorder}`,
                        },
                      })}
                      className="input  w-full"
                      placeholder="MinimumQuantity"
                    />
                    {errors.MinimumQuantity?.type == "required" && (
                      <p className="text-red-500">
                        MinimumQuantity is required
                      </p>
                    )}
                    {errors.MinimumQuantity?.type == "min" && (
                      <p className="text-red-500">
                        {errors.MinimumQuantity.message}
                      </p>
                    )}
                  </span>
                  <span>
                    <label className="label">Contact Number</label>
                    <input
                      type="number"
                      {...register("ContactNumber", { required: true })}
                      className="input w-full"
                      placeholder="ContactNumber"
                    />
                    {errors.ContactNumber?.type == "required" && (
                      <p className="text-red-500">ContactNumber is quantity</p>
                    )}
                  </span>
                  <span>
                    <label className="label">Delivery Address</label>
                    <input
                      type="text"
                      {...register("DeliveryAddress", { required: true })}
                      className="input w-full"
                      placeholder="Address"
                    />
                    {errors.DeliveryAddress?.type == "required" && (
                      <p className="text-red-500">Address is quantity</p>
                    )}
                  </span>

                  <button className="bg-linear-to-r from-[#632ee3]  to-[#9f62f2] px-4 p-2 font-semibold rounded-sm text-white">
                    Add Product
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
