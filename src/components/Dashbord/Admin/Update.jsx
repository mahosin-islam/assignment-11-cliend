import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { AuthContex } from "../../../Providers/AuthContex";
import Loading from "../../../Extra/Loading";
import { UploadImg } from "../../../Utils/UploadImg";

const Update = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const axiosSicure = useAxiosSicures();
  const { id } = useParams();
  // get porduct
  const { isPending, data: product = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSicure.get(`/product/${id}`);
      return res.data;
    },
  });

  console.log("product", product);
  const { user } = use(AuthContex);
  const navigate = useNavigate();
  // react form submit
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm();

  //tanstack-quears-section
  const { isPaused, isError, mutateAsync } = useMutation({
    mutationFn: async (data) =>
      await axiosSicure.patch(`/updat-product/${id}`, data),
    onSuccess: () => {
      toast("succes full product patch");
      navigate("/");
    },
    onError: (err) => {
      console.log("error", err);
    },
    onMutate: (data) => {
      console.log("i will post this data", data);
    },
    onSettled: (error) => {
      if (error) {
        console.log(error);
      }
    },
    retry: 3,
  });
  if (isPaused || isPending) {
    return <Loading></Loading>;
  }
  if (isError) {
    return toast("you post request fail");
  }
  // addd product
  const addProduct = async (data) => {
    console.log(data);
    const {
      Description,
      MinimumOrder,
      Payment,
      Price,
      Discount,
      ProductName,
      quantity,
      Category,
    } = data;
    // / form multiple photo select
    // const photo = data.photo;
    // const urlArray = [];
    // for (let file of photo) {
    //   const imgUrl = await UploadImg(file);
    //   urlArray.push(imgUrl);
    // }

    // default old images


let urlArray = [];

if (data?.photo && data.photo.length > 0) {
  for (let file of data.photo) {
    const imgUrl = await UploadImg(file);
    urlArray.push(imgUrl);
  }
} else {
  urlArray = product?.Images || [];
}



    const productInfo = {
      ProductName: ProductName,
      cratorEmail: user?.email,
      MinimumOrder: MinimumOrder,
      price: parseInt(Price),
      Discount: Discount,
      Homepage: product?.Homepage,
      quantity: parseInt(quantity),
      Category: Category,
      Payment: Payment,
      Description: Description,
      creatAt: new Date(),
      Images: urlArray,
    };

    try {
      await mutateAsync(productInfo);
    } catch (err) {
      console.log("wourd you add plant", err.message);
    }

    reset();
  };

  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(addProduct)}>
                <fieldset className="fieldset">
                  <div className="md:flex-row flex flex-col gap-2">
                    <span>
                      <label className="label">Product Name</label>

                      <input
                        type="text"
                        defaultValue={product.ProductName}
                        {...register("ProductName", { required: true })}
                        className="input w-full"
                        placeholder="name"
                      />
                      {errors.ProductName?.type == "required" && (
                        <p className="text-red-500">Name is required</p>
                      )}
                    </span>
                    <span>
                      <label className="label">Price </label>
                      <input
                        type="number"
                        defaultValue={product.price}
                        {...register("Price", { required: true })}
                        className="input w-full"
                        placeholder="price"
                      />
                      {errors.Price?.type == "required" && (
                        <p className="text-red-500">Price is required</p>
                      )}
                    </span>

                    <span>
                      <label className="label">Discount</label>
                      <input
                        type="number"
                        defaultValue={product.Discount}
                        {...register("Discount")}
                        className="input "
                        placeholder="Discount %"
                      />
                    </span>
                  </div>

                  <div className="md:flex-row flex flex-col gap-2">
                    <span>
                      <label className="label">Available Quantity</label>
                      <input
                        type="number"
                        defaultValue={product.quantity}
                        {...register("quantity", { required: true })}
                        className="input  w-full"
                        placeholder="Quantity"
                      />
                      {errors.quantity?.type == "required" && (
                        <p className="text-red-500">quantity is required</p>
                      )}
                    </span>
                    <span>
                      <label className="label">Minimum Order</label>
                      <input
                        type="number"
                        defaultValue={product.MinimumOrder}
                        {...register("MinimumOrder", { required: true })}
                        className="input w-full"
                        placeholder="Minimum Order"
                      />
                      {errors.MinimumOrder?.type == "required" && (
                        <p className="text-red-500">MinimumOrder quantity</p>
                      )}
                    </span>
                  </div>

                  <div>
                    <label className="label">Chose photo</label>

                    <input
                      type="file"
                      multiple
                      className="input w-full"
                      {...register("photo", {
                        onChange: (e) => {
                          const files = e.target.files;
                          const previewArray = [];

                          for (let i = 0; i < files.length; i++) {
                            previewArray.push(URL.createObjectURL(files[i]));
                          }

                          setPreviewImages(previewArray); // নতুন image select করলে overwrite
                        },
                      })}
                    />

                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {previewImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="preview"
                          className="w-24 h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                    {errors.photo?.type == "required" && (
                      <p className="text-red-500">Images quantity</p>
                    )}
                  </div>
                  {/* paymetn method */}
                  <div className="w-full">
                    <label className="label">Payment Options</label>
                    <br />
                    <select
                      className="select w-full"
                      defaultValue={product.Payment}
                      {...register("Payment", { required: true })}
                    >
                      {errors.Payment?.type == "required" && (
                        <p className="text-red-500">Payment quantity</p>
                      )}

                      <option value="" disabled>
                        chose paymetn system
                      </option>

                      <option>Cash on Delivery</option>
                      <option>PayFast</option>
                    </select>
                  </div>
                  {/* porduct category  */}
                  <div className="w-full">
                    <label className="label">Product category</label>
                    <br />
                    <select
                      className="select w-full"
                      defaultValue={product.Category}
                      {...register("Category", { required: true })}
                    >
                      {errors.Payment?.type == "required" && (
                        <p className="text-red-500">Product category</p>
                      )}

                      <option value="" disabled>
                        chose category
                      </option>

                      <option>T-shart</option>
                      <option>shart</option>
                      <option>Pant</option>
                      <option>Jacket</option>
                      <option>Accessories</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="label">Product Description</label>
                    <textarea
                      defaultValue={product.Description}
                      {...register("Description")}
                      rows="2"
                      className="textarea w-full"
                      placeholder="Write your description (max 20 words)"
                    ></textarea>
                  </div>

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

export default Update;
