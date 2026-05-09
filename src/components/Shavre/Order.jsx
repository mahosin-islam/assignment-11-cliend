import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxiosSicures from "../../Hooks/useAxiosSicure";
import { AuthContex } from "../../Providers/AuthContex";
import Loading from "../../Extra/Loading";
import { MdOutlineLocalShipping, MdOutlinePayments } from "react-icons/md";

const Order = () => {
  const axiosSicure = useAxiosSicures();
  const { user } = use(AuthContex);
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderProduc = state?.orderProduc;

  // Destructure product info
  const { ProductName, price, Payment, _id, cratorEmail, MinimumOrder, quantity, photo, selectedSize } = orderProduc || {};

console.log("minmut oride",orderProduc)

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm({
    defaultValues: {
      MinimumQuantity: MinimumOrder || 1,
    },
  });

  // Watch quantity change
  const watchQuantity = watch("MinimumQuantity");
//calcualtion for arder
  const currentQuantity = Number(watchQuantity) || Number(MinimumOrder) || 1;
  const currentTotalPrice = Number(price) * currentQuantity;

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post("/orders", data),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      navigate("/dashboard/My-order");
    },
    onError: (err) => toast.error(`Order failed: ${err.message}`),
  });

  const onCheckout = async (data) => {
    // data.MinimumQuantity থেকে রিয়েল ভ্যালু নেওয়া হচ্ছে
    const finalQuantity = Number(data.MinimumQuantity) || Number(MinimumOrder);
    const finalTotalPrice = Number(price) * finalQuantity;

    const orderInfo = {
      OrderEmail: user?.email,
      cratorEmail,
      ProductName,
      Price: finalTotalPrice, // টোটাল প্রাইস পাঠানো হচ্ছে
      ProductId: _id,
      PaymentType: Payment,
      OrderQuantite: finalQuantity,
      quantity, 
      FirstName: data.FirstName,
      LastName: data.LastName,
      ContactNumber: data.ContactNumber,
      DeliveryAddress: data.DeliveryAddress,
      photo,
      selectedSize,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      if (Payment === "Cash on Delivery") {
        await mutateAsync(orderInfo);
      } else if (Payment === "PayFast") {
        const res = await axiosSicure.post("/payment-checkout-session", orderInfo);
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Order processing error:", err);
      toast.error("Something went wrong!");
    }
  };

  if (!orderProduc) return <div className="pt-40 text-center">No product selected.</div>;
  if (isPending) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 pt-12 pb-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-base-content">
          <MdOutlinePayments className="text-primary" /> Checkout
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: SHIPPING FORM */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MdOutlineLocalShipping /> Shipping Information
                </h3>
                <form onSubmit={handleSubmit(onCheckout)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label font-semibold">First Name</label>
                      <input
                        type="text"
                        {...register("FirstName", { required: "First name is required" })}
                        className="input input-bordered focus:input-primary"
                        placeholder="John"
                      />
                      {errors.FirstName && <span className="text-error text-xs mt-1">{errors.FirstName.message}</span>}
                    </div>
                    <div className="form-control">
                      <label className="label font-semibold">Last Name</label>
                      <input
                        type="text"
                        {...register("LastName", { required: "Last name is required" })}
                        className="input input-bordered focus:input-primary"
                        placeholder="Doe"
                      />
                      {errors.LastName && <span className="text-error text-xs mt-1">{errors.LastName.message}</span>}
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">Quantity to Order (Min: {MinimumOrder})</label>
                    <input
                      type="number"
                      {...register("MinimumQuantity", {
                        required: "Quantity is required",
                        min: { value: MinimumOrder, message: `Minimum ${MinimumOrder} pieces required` },
                      })}
                      className="input input-bordered focus:input-primary"
                    />
                    {errors.MinimumQuantity && <span className="text-error text-xs mt-1">{errors.MinimumQuantity.message}</span>}
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">Contact Number</label>
                    <input
                      type="tel"
                      {...register("ContactNumber", { required: "Contact number is required" })}
                      className="input input-bordered focus:input-primary"
                      placeholder="017XXXXXXXX"
                    />
                    {errors.ContactNumber && <span className="text-error text-xs mt-1">{errors.ContactNumber.message}</span>}
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">Delivery Address</label>
                    <textarea
                      {...register("DeliveryAddress", { required: "Address is required" })}
                      className="textarea textarea-bordered focus:textarea-primary h-24"
                      placeholder="Full Address, City, Area"
                    ></textarea>
                    {errors.DeliveryAddress && <span className="text-error text-xs mt-1">{errors.DeliveryAddress.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mt-6 text-lg">
                    {Payment === "Cash on Delivery" ? "Confirm Order" : "Proceed to Payment"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="w-full lg:w-96 order-1 lg:order-2">
            <div className="card bg-base-100 shadow-xl border border-base-300 sticky top-32">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                
                <div className="flex gap-4 items-center mb-6 border-b border-base-200 pb-4">
                  <img src={photo} alt={ProductName} className="w-20 h-20 object-cover rounded-lg bg-base-200 border" />
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{ProductName}</h4>
                    <p className="text-xs text-base-content/60 mt-1">Size: <span className="badge badge-sm badge-ghost">{selectedSize || "N/A"}</span></p>
                    <p className="text-sm font-semibold mt-1">৳{price} / pc</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Unit Price</span>
                    <span>৳{Number(price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantity</span>
                    <span>{currentQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span className="badge badge-outline text-[10px] uppercase font-bold">{Payment}</span>
                  </div>
                  
                  <div className="divider my-1"></div>
                  
                  <div className="flex justify-between items-center text-lg font-black">
                    <span>Total</span>
                    <span className="text-primary text-2xl">৳{currentTotalPrice}</span>
                  </div>
                </div>

                <div className="mt-6 bg-primary/5 p-3 rounded-xl border border-primary/10 flex items-start gap-2">
                  <div className="text-primary text-[11px] leading-tight">
                    <span className="font-bold">Note:</span> Please review your address before {Payment === "PayFast" ? "payment" : "confirming"}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;