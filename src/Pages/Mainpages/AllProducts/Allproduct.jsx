import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import AllCard from "./AllCard";

const Allproduct = () => {
  const axiosSicure = useAxiosSicures();
  const [search, setSearch] = useState("");
  const limit = 10;
  const [currentpage, setCurrentpage] = useState(0);

  const { Loading, data } = useQuery({
    queryKey: ["products",search, currentpage],
    queryFn: async () => {
      const res = await axiosSicure.get(
        `/All-pagination?limit=${limit}&skip=${
          currentpage * limit
        }&search=${search}`
      );
      return res.data;
    },
  });
  console.log("prodct", data);
  if (Loading) {
    return <Loading></Loading>;
  }

  const product = data?.result || [];
  const total = data?.total || 0;
  const totalpage = Math.ceil(total / limit);

  return (
    <div className="mt-25">
      <div className=" text-center  rotate-xl">
        {/* search-section */}
        <label className="my-2">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search prodcut by name"
            className="input rounded-full"
          />
        </label>
      </div>
      <div
        className="
       
  mx-4 md:mx-10
  mt-2
  grid 
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  gap-4
      "
      >
        {Array.isArray(product) &&
          product.map((card) => <AllCard key={card._id} card={card}></AllCard>)}
      </div>
      <div className="flex gap-4 my-10 justify-end">
        {currentpage > 0 && (
          <button
            className="btn"
            onClick={() => setCurrentpage(currentpage - 1)}
          >
            prev
          </button>
        )}

        {[...Array(totalpage).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentpage(i)}
            className={`btn ${i === currentpage && "btn-primary"}`}
          >
            {i + 1}
          </button>
        ))}
        {totalpage > currentpage + 1 && (
          <button
            onClick={() => setCurrentpage(currentpage + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Allproduct;
