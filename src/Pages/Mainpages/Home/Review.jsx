import React from "react";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const axiosSicure = useAxiosSicures();

  const { data: Reviews = [], isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSicure.get("/review");
      return res.data;
    },
  });

  // ডাটা লোড হওয়ার সময় লোডিং দেখানো ভালো
  if (isLoading) return <Loading />;

  return (
    <div className="py-10 ">
      <div className="text-center w-8/12 mx-auto mb-10">
        <h2 className="text-3xl py-2 font-bold">
          What our customers are saying
        </h2>
        <p className="text-gray-600">
          Enhance posture, mobility, well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>

      {/*
          ২. key={Reviews.length} ব্যবহার করা হয়েছে যাতে ডাটা আপডেট হলে Swiper রি-রেন্ডার হয়।
      */}
      {Reviews.length > 0 && (
        <Swiper
          key={Reviews.length}
          loop={Reviews.length > 3} // স্লাইড সংখ্যা স্লাইড-পার-ভিউ এর চেয়ে বেশি হতে হবে
          slidesPerView={1}
          spaceBetween={20}
          speed={8000} 
          allowTouchMove={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // মাউস রাখলে থামবে, এটি ইউজার এক্সপেরিয়েন্স বাড়ায়
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper review-slider"
        >
          {Reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Review;