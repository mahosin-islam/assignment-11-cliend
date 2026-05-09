import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import AllCard from "./AllCard";

const Allproduct = () => {
  const axiosSicure = useAxiosSicures();
  
  // States
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentpage, setCurrentpage] = useState(0);
  const limit = 12;

  // Filter States (Multiple Selection)
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  // Checkbox Handler
  const handleCheckboxChange = (value, state, setter) => {
    const isSelected = state.includes(value);
    if (isSelected) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
    setCurrentpage(0); // ফিল্টার বদলালে পেজ ১-এ ফিরে যাবে
  };

  // Fetch Data
  const { isLoading, data } = useQuery({
    queryKey: ["products", search, currentpage, selectedBrands, selectedGenders, selectedSeasons,selectedSizes,priceRange],
    queryFn: async () => {
      const res = await axiosSicure.get("/All-pagination", {
        params: {
          limit,
          skip: currentpage * limit,
          search,
          brand: selectedBrands.join(","),
          gender: selectedGenders.join(","),
          season: selectedSeasons.join(","),
          size: selectedSizes.join(","),
          priceRange, // নতুন প্যারামিটার
        },
      });
      return res.data;
    },
  });

  const product = data?.result || [];
  const total = data?.total || 0;
  const totalpage = Math.ceil(total / limit);

  return (
    <div className="mt-25 flex flex-col md:flex-row gap-6 px-4 md:px-10">
      
      {/* --- SIDEBAR FILTER --- */}
      <div className="w-full md:w-64 p-5 bg-base-100 border rounded-2xl shadow-sm h-fit">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Filters</h3>
          <button 
            onClick={() => {
                setSelectedBrands([]); setSelectedGenders([]); 
                setSelectedSizes([]);
                setSelectedSeasons([]); setSearch(""); setCurrentpage(0);
            }}
            className="text-red-500 text-sm font-semibold hover:underline"
          >Reset</button>
        </div>

        {/* Brand Category */}
        <div className="mb-6">
          <p className="font-bold text-gray-400 mb-3 uppercase text-xs tracking-widest">Brand</p>
          {["Yellow", "Ecstasy", "Apex", "Richman"].map((brandName) => (
            <label key={brandName} className="flex items-center gap-3 mb-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brandName)}
                onChange={() => handleCheckboxChange(brandName, selectedBrands, setSelectedBrands)}
                
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-gray-700 group-hover:text-primary transition-colors">{brandName}</span>
            </label>
          ))}
        </div>

        {/* Gender Category */}
        <div className="mb-6">
          <p className="font-bold text-gray-400 mb-3 uppercase text-xs tracking-widest">Gender</p>
          {["Male", "Women", "Unisex"].map((g) => (
            <label key={g} className="flex items-center gap-3 mb-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenders.includes(g)}
                onChange={() => handleCheckboxChange(g, selectedGenders, setSelectedGenders)}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-gray-700 group-hover:text-primary">{g}</span>
            </label>
          ))}
        </div>

           {/* Season Category */}

             <div className="mb-6">
          <p className="font-bold text-gray-400 mb-3 uppercase text-xs tracking-widest">Season</p>
          {[ "Summer","Rainy", "Winter"].map((season) => (
            <label key={season} className="flex items-center gap-3 mb-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSeasons.includes(season)}
                onChange={() => handleCheckboxChange(season, selectedSeasons, setSelectedSeasons)}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-gray-700 group-hover:text-primary">{season}</span>
            </label>
          ))}
              </div>

              <div className="mb-6">
  <p className="font-bold text-gray-400 mb-3 uppercase text-xs tracking-widest">Sizes</p>
  <div className="grid grid-cols-2 gap-2"> {/* সাইজগুলো গ্রিড আকারে দেখালে সুন্দর লাগে */}
    {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map((sz) => (
      <label key={sz} className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={selectedSizes.includes(sz)}
          onChange={() => handleCheckboxChange(sz, selectedSizes, setSelectedSizes)}
          className="checkbox checkbox-xs checkbox-secondary"
        />
        <span className="text-sm text-gray-600 group-hover:text-secondary">{sz}</span>
      </label>
    ))}
  </div>
</div>

      </div>
      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1">


        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search products..."
    className="input input-bordered w-full max-w-md rounded-full shadow-sm"
    onChange={(e) => {setSearch(e.target.value); setCurrentpage(0);}}
  />

  {/* Price Range Filter */}
  <select 
    className="select select-bordered rounded-full w-full max-w-xs shadow-sm"
    onChange={(e) => {setPriceRange(e.target.value); setCurrentpage(0);}}
    value={priceRange}
  >
    <option value="">Sort by Price (All)</option>
    <option value="0-500">0 - 500 TK</option>
    <option value="500-1000">500 - 1000 TK</option>
    <option value="1000-over">1000+ TK</option>
  </select>
  </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            product.map((card) => <AllCard key={card._id} card={card}></AllCard>)
          )}
        </div>

        {/* --- PAGINATION SECTION --- */}
        {totalpage > 0 && (
          <div className="flex gap-2 my-12 justify-center md:justify-end items-center">
            {/* Previous Button */}
            <button
              disabled={currentpage === 0}
              className={`btn btn-sm ${currentpage === 0 && "btn-disabled"}`}
              onClick={() => setCurrentpage(currentpage - 1)}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalpage).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentpage(i)}
                className={`btn btn-sm ${i === currentpage ? "btn-primary" : "btn-ghost"}`}
              >
                {i + 1}
              </button>
            ))}
            {/* Next Button */}
            <button
              disabled={currentpage + 1 >= totalpage}
              className={`btn btn-sm ${currentpage + 1 >= totalpage && "btn-disabled"}`}
              onClick={() => setCurrentpage(currentpage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allproduct;