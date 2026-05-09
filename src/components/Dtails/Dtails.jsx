import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiFillStar, AiOutlineTag } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { toast } from "react-toastify";
import useAxiosSicures from "../../Hooks/useAxiosSicure";
import useRole from "../../Hooks/useRole";
import useStatus from "../../Hooks/useStatus";
import Loading from "../../Extra/Loading";
import AllCard from "../../Pages/Mainpages/AllProducts/AllCard";


const Dtails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const axiosSicure = useAxiosSicures();
  const { role } = useRole();
  const { status } = useStatus();

  // ১. বর্তমান প্রোডাক্টের ডিটেইলস ফেচ করা
  const { isPending, data: product = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSicure.get(`/product/${id}`);
      return res.data;
    },
  });

  // ২. একই জেন্ডার ক্যাটাগরির রিলেটেড প্রোডাক্ট ফেচ করা
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.Gender, id],
    queryFn: async () => {
     
      const res = await axiosSicure.get(`/category?Gender=${product?.Gender}`);
   
      return res.data.filter(item => item._id !== id);
    },
    enabled: !!product?.Gender,
  });

  useEffect(() => {
    if (product?.Images?.length > 0) setActiveImage(product.Images[0]);
    if (product?.Sizes?.length > 0) setSelectedSize(product.Sizes[0]);
    // নতুন প্রোডাক্টে ক্লিক করলে পেজ যেন উপরে চলে যায়
    window.scrollTo(0, 0);
  }, [product, id]);

  if (isPending) return <Loading />;

  const {
    Description, Images, MinimumOrder, ProductName, Payment,
    quantity, price, Discount, Brand, Rating, Sizes, Gender, Season, cratorEmail
  } = product;

  const discountedPrice = Discount > 0 ? (price - (price * Discount) / 100).toFixed(0) : price;

  const handleBuyNow = () => {
    if (role === "manager" || role === "admin") return toast.error("Admins cannot place orders.");
    if (role !== "buyer") return navigate("/login");
    if (status === "suspend") return toast.error("Account suspended.");
    
    const orderProduc = { ProductName, price: discountedPrice, photo: activeImage, selectedSize, _id: product._id, cratorEmail, Payment, quantity, MinimumOrder };
    navigate("/Order", { state: { orderProduc } });
  };

  return (
    <div className="min-h-screen bg-base-100 pt-5 pb-12 px-4 md:px-10 lg:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-lg overflow-hidden border border-base-300">
        <div className="flex flex-col lg:flex-row">
          
          {/* --- LEFT: IMAGE SECTION --- */}
          <div className="lg:w-1/2 p-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-all mb-6 font-medium">
              <IoMdArrowRoundBack /> Back
            </button>
            
            <div className="relative group rounded-2xl overflow-hidden bg-base-200 flex justify-center items-center h-[400px] md:h-[500px] border border-base-300">
              <img className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105" src={activeImage} alt="product" />
              {Discount > 0 && (
                <div className="absolute top-4 left-4 bg-error text-error-content px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  -{Discount}%
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6 overflow-x-auto justify-center">
              {Images?.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 rounded-xl cursor-pointer border-2 transition-all overflow-hidden bg-base-200 ${activeImage === img ? "border-primary scale-95" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={img} className="h-full w-full object-cover" alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: INFO SECTION --- */}
          <div className="lg:w-1/2 p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-base-300">
            <div className="space-y-6">
              <div>
                <p className="text-secondary font-bold tracking-widest text-sm uppercase">{Brand}</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-base-content mt-2">{ProductName}</h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="badge badge-success gap-1 font-bold">
                    {Rating || 0} <AiFillStar />
                  </div>
                  <span className="text-base-content/50">|</span>
                  <span className="text-base-content/70 text-sm font-medium">{Gender}</span>
                  <span className="text-base-content/50">|</span>
                  <span className="text-base-content/70 text-sm font-medium">{Season}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-base-content">৳{discountedPrice}</span>
                  {Discount > 0 && <span className="text-xl text-base-content/40 line-through">৳{price}</span>}
                </div>
                <p className="text-success font-medium text-sm">Stock: {quantity} units</p>
              </div>

              <div className="divider opacity-50"></div>
              
              {/* Sizes */}
              <div>
                <h3 className="text-sm font-bold text-base-content uppercase tracking-wider mb-4 font-mono">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {Sizes?.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-12 w-14 rounded-xl font-bold border-2 transition-all ${selectedSize === sz ? "border-primary bg-primary text-primary-content" : "border-base-300 hover:border-primary/50 text-base-content/70"}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-base-content uppercase flex items-center gap-2">
                  <AiOutlineTag className="text-primary" /> Details
                </h3>
                <p className="text-base-content/70 leading-relaxed">{Description}</p>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-2 gap-4 bg-base-200 p-4 rounded-2xl border border-base-300">
                <div>
                  <p className="text-base-content/50 text-xs font-bold uppercase">Payment</p>
                  <p className="text-base-content font-semibold text-sm">{Payment}</p>
                </div>
                <div className="border-l border-base-300 pl-4">
                  <p className="text-base-content/50 text-xs font-bold uppercase">Min. Order</p>
                  <p className="text-base-content font-semibold text-sm">{MinimumOrder} Pcs</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleBuyNow}
                className="btn btn-primary btn-block h-16 rounded-2xl text-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MdOutlineLocalShipping className="text-2xl" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- RELATED PRODUCTS SECTION --- */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-black text-base-content uppercase tracking-tight">
              Related For {Gender}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((card) => (
                   <AllCard key={card._id} card={card}></AllCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dtails;