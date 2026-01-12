import React from "react";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Extra/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const axiosSicure = useAxiosSicures();

  const { data: Reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSicure.get("/review");
      return res.data;
    },
  });

  return (
    <div>
      <div className="">
        <div className="text-center w-8/12 mx-auto ">
          <h2 className="text-3xl py-2 font-bold">
            What our customers are sayings
          </h2>
          <p>
            Enhance posture, mobility, well-being effortlessly with Posture Pro.
            Achieve proper alignment, reduce <br /> pain, and strengthen your
            body with ease!
          </p>
        </div>

        <>
          <Swiper
            loop={true}
            slidesPerView={3}
            spaceBetween={10}
            allowTouchMove={false}
            speed={9000} // higher = slower & smoother movement
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {Reviews?.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
   
      <div>
     
      </div>
    </div>
  );
};

export default Review;
