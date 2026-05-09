import React, { use, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { AuthContex } from "../../../Providers/AuthContex";
import Loading from "../../../Extra/Loading";
import { UploadImg } from "../../../Utils/UploadImg";
import { IoCloudUploadOutline, IoBagAddOutline } from "react-icons/io5";

const Update = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const axiosSicure = useAxiosSicures();
  const { id } = useParams();
  const { user } = use(AuthContex);
  const navigate = useNavigate();
  const { isPending: isLoadingProduct, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSicure.get(`/product/${id}`);
      return res.data;
    },
  });

  const { handleSubmit, reset, formState: { errors }, register } = useForm();
  useEffect(() => {
    if (product?.Images) {
      setPreviewImages(product.Images);
    }
  }, [product]);
  const { isPending: isUpdating, mutateAsync } = useMutation({
    mutationFn: async (updatedData) => await axiosSicure.patch(`/updat-product/${id}`, updatedData),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      navigate("/");
    },
    onError: (err) => {
      console.log("Update error", err);
      toast.error("Failed to update product.");
    },
  });

  if (isLoadingProduct) return <Loading />;

  const onUpdateProduct = async (data) => {
    const idToast = toast.loading("Updating product details and images...");
    
    let urlArray = [];
    try {
      // যদি নতুন ছবি আপলোড করা হয়
      if (data.photo && data.photo.length > 0) {
        for (let file of data.photo) {
          const imgUrl = await UploadImg(file);
          if (imgUrl) urlArray.push(imgUrl);
        }
      } else {
        // নতুন ছবি না দিলে আগেরগুলোই থাকবে
        urlArray = product?.Images || [];
      }
      const productInfo = {
        ProductName: data.ProductName,
        Brand: data.Brand,
        cratorEmail: user?.email,
        MinimumOrder: parseInt(data.MinimumOrder),
        price: parseInt(data.Price),
        Discount: parseInt(data.Discount || 0),
        Homepage: product?.Homepage || false,
        quantity: parseInt(data.quantity),
        Gender: data.Gender,
        Sizes: data.Sizes,
        type: data.type,
        Payment: data.Payment,
        Season: data.Season,
        Description: data.Description,
        Images: urlArray,
        InStock: parseInt(data.quantity) > 0,
        // রেটিং এবং রিভিউ আগের মতোই থাকবে
        Rating: product?.Rating || 0,
        TotalReviews: product?.TotalReviews || 0
      };

      await mutateAsync(productInfo);
      toast.update(idToast, { render: "Update Complete!", type: "success", isLoading: false, autoClose: 3000 });
    } catch (err) {
      toast.update(idToast, { render: "Update failed!", type: "error", isLoading: false, autoClose: 3000 });
      console.log("Submit error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-2 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section - Addproduct এর মতো */}
        <div className="bg-[#1c1c1c] text-white p-6 md:p-10 border-b-4 border-[#632ee3]">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="p-4 bg-[#632ee3]/20 rounded-2xl">
              <IoBagAddOutline className="text-5xl text-[#9f62f2]" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Update Product</h2>
              <p className="text-neutral-400">Modify your product details carefully.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onUpdateProduct)} className="p-5 md:p-12 space-y-10">
          
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#632ee3] rounded-full"></span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-semibold text-gray-600">Product Name *</label>
                <input
                  type="text"
                  defaultValue={product?.ProductName}
                  {...register("ProductName", { required: "Product name is required" })}
                  className="input input-bordered focus:ring-2 focus:ring-[#632ee3]"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Brand Name *</label>
                <select
                  defaultValue={product?.Brand}
                  {...register("Brand", { required: "Required" })}
                  className="select select-bordered"
                >
                  <option value="Garments Hub">Garments Hub</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Apex">Apex</option>
                  <option value="Others">Others / Local</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#632ee3] rounded-full"></span>
              Inventory & Pricing
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="form-control">
                <label className="label font-semibold text-gray-600">Price (TK) *</label>
                <input type="number" defaultValue={product?.price} {...register("Price", { required: true })} className="input input-bordered" />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Discount %</label>
                <input type="number" defaultValue={product?.Discount} {...register("Discount")} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-gray-600">Quantity *</label>
                <input type="number" defaultValue={product?.quantity} {...register("quantity", { required: true })} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-gray-600">MOQ *</label>
                <input type="number" defaultValue={product?.MinimumOrder} {...register("MinimumOrder", { required: true })} className="input input-bordered" />
              </div>
            </div>
          </div>

          {/* Logistics & Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label text-neutral-700 font-medium">Perfect For Season *</label>
              <select defaultValue={product?.Season} {...register("Season", { required: true })} className="select select-bordered">
                <option value="Summer">Summer Collection</option>
                <option value="Winter">Winter Collection</option>
                <option value="Rainy">Rainy Season</option>
                <option value="All Season">All Seasons</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label text-neutral-700 font-medium">Default Payment Option *</label>
              <select defaultValue={product?.Payment} {...register("Payment", { required: true })} className="select select-bordered">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFast">PayFast (Secure Online)</option>
              </select>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#632ee3] rounded-full"></span>
              Classification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label font-semibold text-gray-600">Type of product *</label>
                <select defaultValue={product?.type} {...register("type")} className="select select-bordered">
                     <option value="Topwear">T-shirt</option>
                  <option value="Bottomwear">Pant</option>
                  <option value="Footwear">Shart</option>
                  <option value="Footwear">Code</option>
                  <option value="Nekap">Nekap</option>
                  <option value="Panjami">Panjami</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Sub Category *</label>
                <select defaultValue={product?.SubCategory} {...register("SubCategory", { required: "Required" })} className="select select-bordered">
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">Gender *</label>
                <select defaultValue={product?.Gender} {...register("Gender", { required: "Required" })} className="select select-bordered">
                  <option value="Male">Male</option>
                  <option value="Women">Women</option>
                  <option value="Child">Child</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specifications - Sizes */}
          <div className="form-control p-6 border rounded-2xl bg-gray-50">
            <label className="label font-bold text-gray-700 mb-2">Available Sizes *</label>
          <div className="flex flex-wrap gap-4">
  {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
    <label key={size} className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border hover:border-[#632ee3] transition-colors">
      <input 
        type="checkbox" 
        value={size} 
        // ১. এখানে defaultChecked এর বদলে চেকড লজিকটি এভাবে লিখুন
        {...register("Sizes")} 
        defaultChecked={product?.Sizes && product.Sizes.includes(size)}
        className="checkbox checkbox-primary checkbox-sm" 
      />
      <span className="font-medium">{size}</span>
    </label>
  ))}
</div>
          </div>

          {/* Description & Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-control">
              <label className="label font-semibold text-gray-600">Description</label>
              <textarea defaultValue={product?.Description} {...register("Description")} className="textarea textarea-bordered h-32" placeholder="Product details..."></textarea>
            </div>

            <div className="form-control">
              <label className="label font-semibold text-gray-600">Update Images (Leave empty to keep existing)</label>
              <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center relative bg-gray-50">
                <input
                  type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer"
                  {...register("photo", {
                    onChange: (e) => {
                      const files = Array.from(e.target.files);
                      setPreviewImages(files.map(file => URL.createObjectURL(file)));
                    }
                  })}
                />
                <IoCloudUploadOutline className="text-4xl mb-2 text-gray-400" />
                <p className="text-sm font-medium text-gray-500">Click to replace product photos</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {previewImages.map((img, idx) => (
                  <img key={idx} src={img} className="w-20 h-20 object-cover rounded-lg border shadow-sm" alt="preview" />
                ))}
              </div>
            </div>
          </div>

          <button type="submit" disabled={isUpdating} className="btn w-full h-16 bg-gradient-to-r from-[#632ee3] to-[#9f62f2] border-none text-white text-xl font-bold rounded-xl shadow-lg hover:scale-[1.01] transition-all">
            {isUpdating ? "Updating Product..." : "🔄 Update & Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;