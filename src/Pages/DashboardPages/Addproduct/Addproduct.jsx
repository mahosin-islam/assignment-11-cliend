import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadImg } from "../../../Utils/UploadImg";
import { useMutation } from "@tanstack/react-query";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../../Extra/Loading";
import { AuthContex } from "../../../Providers/AuthContex";
import useStatus from "../../../Hooks/useStatus";
import { IoCloudUploadOutline, IoBagAddOutline } from "react-icons/io5";

const Addproduct = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const { status } = useStatus();
  const axiosSicure = useAxiosSicures();
  const { user } = use(AuthContex);
  const navigate = useNavigate();

  const { handleSubmit, reset, formState: { errors }, register } = useForm();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post("/product", data),
    onSuccess: () => {
      toast.success("Success! Product is now live.");
      navigate("/dashboard/manage-products");
    },
    onError: (err) => {
      toast.error("Failed to post product.");
    },
  });

  if (isPending) return <Loading />;

  const onSubmitProduct = async (data) => {
    if (status === "suspend") {
      navigate('/dashboard/Myprofile');
      return toast.warning("Access Denied: Account suspended.");
    }

    const photoFiles = data.photo;
    const urlArray = [];
    const id = toast.loading("Uploading images and saving product...");

    try {
      for (let file of photoFiles) {
        const imgUrl = await UploadImg(file);
        if (imgUrl) urlArray.push(imgUrl);
      }

      const productInfo = {
        ProductName: data.ProductName,
        Brand: data.Brand,
        cratorEmail: user?.email,
        MinimumOrder: parseInt(data.MinimumOrder),
        price: parseInt(data.Price),
        Discount: parseInt(data.Discount || 0),
        Homepage: false,
        quantity: parseInt(data.quantity),
        Gender: data.Gender,
        Sizes: data.Sizes, // Make sure to handle checkbox array correctly
        type: data.type,
        Payment: data.Payment,
        Season: data.Season,
        Description: data.Description,
        creatAt: new Date(),
        Images: urlArray,
        InStock: true,
        Rating: 0,
        TotalReviews: 0
      };

      await mutateAsync(productInfo);
      toast.update(id, { render: "Product added successfully!", type: "success", isLoading: false, autoClose: 3000 });
      reset();
      setPreviewImages([]);
    } catch (err) {
      toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">

        {/* Header Section - Modern Look */}
        <div className="bg-pink-600 hover:bg-pink-700 p-8 md:p-12 
        text-white
        relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="p-4 bg-base-100/10 rounded-2xl backdrop-blur-md border border-white/20">
              <IoBagAddOutline className="text-5xl" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Add New Product</h2>
              <p className="opacity-80 font-medium">List your premium garment collection to the world.</p>
            </div>
          </div>
          {/* Abstract background shape */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmitProduct)} className="p-6 md:p-12 space-y-12">

          {/* Basic Info Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full"></div>
              <h3 className="text-xl font-bold text-base-content">Essential Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-control">
                <label className="label font-bold text-base-content/70">Product Name *</label>
                <input
                  type="text"
                  {...register("ProductName", { required: "Product name is required" })}
                  className={`input input-bordered bg-base-200 focus:input-primary ${errors.ProductName ? 'border-error' : ''}`}
                  placeholder="e.g. Slim Fit Denim Jacket"
                />
                {errors.ProductName && <span className="text-error text-xs mt-1 font-bold">{errors.ProductName.message}</span>}
              </div>

              <div className="form-control">
                <label className="label font-bold text-base-content/70">Brand Selection *</label>
                <select
                  {...register("Brand", { required: "Required" })}
                  className="select select-bordered bg-base-200 focus:select-primary"
                  defaultValue="Others"
                >
                  <option value="Garments Hub">Garments Hub</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Apex">Apex</option>
                  <option value="Others">Others / Local</option>
                </select>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="bg-base-200/50 p-6 md:p-8 rounded-3xl border border-base-300">
             <h3 className="text-xl font-bold text-base-content mb-6">Inventory & Pricing</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-sm opacity-60 uppercase">Price (BDT)</label>
                  <input type="number" {...register("Price", { required: true })} className="input input-bordered focus:input-secondary" placeholder="0.00" />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm opacity-60 uppercase">Discount (%)</label>
                  <input type="number" {...register("Discount")} className="input input-bordered" placeholder="0" />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm opacity-60 uppercase">Stock Qty</label>
                  <input type="number" {...register("quantity", { required: true })} className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm opacity-60 uppercase">Min Order</label>
                  <input type="number" defaultValue="1" {...register("MinimumOrder", { required: true })} className="input input-bordered" />
                </div>
             </div>
          </section>

          {/* Specs & Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-base-content">Classification</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label font-bold opacity-60">Category Type</label>
                  <select {...register("type")} className="select select-bordered" defaultValue="Topwear">
                    <option value="Topwear">T-shirt / Topwear</option>
                    <option value="Bottomwear">Pant / Bottomwear</option>
                    <option value="Footwear">Shoes / Footwear</option>
                    <option value="Nekap">Nekap / Hijab</option>
                    <option value="Panjami">Panjami / Ethnic</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold opacity-60">Gender</label>
                  <select {...register("Gender")} className="select select-bordered" defaultValue="Unisex">
                    <option value="Male">Male</option>
                    <option value="Women">Women</option>
                    <option value="Child">Child</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-xl font-bold text-base-content">Available Sizes</h3>
               <div className="grid grid-cols-3 gap-3">
                  {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                    <label key={size} className="flex items-center gap-2 p-3 bg-base-200 rounded-xl cursor-pointer hover:bg-secondary/10 border border-transparent hover:border-secondary transition-all">
                      <input type="checkbox" value={size} {...register("Sizes")} className="checkbox checkbox-secondary checkbox-sm" />
                      <span className="font-bold text-sm">{size}</span>
                    </label>
                  ))}
               </div>
            </div>
          </div>

          {/* Description & Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-control">
              <label className="label font-bold text-base-content">Detailed Description</label>
              <textarea 
                {...register("Description")} 
                className="textarea textarea-bordered h-40 bg-base-200 focus:textarea-primary text-base" 
                placeholder="Describe fabric, fit, and style..."
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label font-bold text-base-content">Product Showcase (Images) *</label>
              <div className={`group border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all relative ${errors.photo ? 'border-error bg-error/5' : 'border-base-300 bg-base-200 hover:border-primary'}`}>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  {...register("photo", {
                    required: "At least one image is required",
                    onChange: (e) => {
                      const files = Array.from(e.target.files);
                      setPreviewImages(files.map(file => URL.createObjectURL(file)));
                    }
                  })}
                />
                <IoCloudUploadOutline className={`text-5xl mb-3 transition-transform group-hover:-translate-y-2 ${errors.photo ? 'text-error' : 'text-primary'}`} />
                <p className="text-sm font-bold opacity-60">Drag & Drop or Click to upload</p>
                <p className="text-xs opacity-40 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
              </div>
              
              {/* Image Previews */}
              <div className="flex flex-wrap gap-3 mt-6">
                {previewImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-secondary shadow-lg">
                    <img src={img} className="w-full h-full object-cover" alt="preview" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-pink-600 hover:bg-pink-700 text-white  px-6 py-3 rounded-xl font-bold shadow-lg transition-all w-full text-center"
            >
              {isPending ? <span className="loading loading-spinner"></span> : "Publish to Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;