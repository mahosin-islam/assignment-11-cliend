import React from 'react';
import useAxiosSicures from '../../../Hooks/useAxiosSicure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Extra/Loading';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from './ReviewCard';


const Review = () => {
     const axiosSicure = useAxiosSicures();
     
  const { isLoading, data:Reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSicure.get("/review");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(Reviews)
    return (
        <div>
             <div className="my-10">
      <div className="text-center w-8/12 mx-auto ">
        <h2 className="text-3xl py-2 font-bold">What our customers are sayings</h2>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body
          with ease!
        </p>
      </div>

      <>
        <Swiper
          // effect={"coverflow"}
          loop={true}
          // spaceBetween={30}
          // grabCursor={true}
          breakpoints={{
            // Mobile (default)
            0: {
              slidesPerView: 1,
            },
            // Tablet
            640: {
              slidesPerView: 2,
            },
            // Laptop
            1024: {
              slidesPerView: 3,
            },
          }}
          centeredSlides={true}
          slidesPerView={3}
         
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper "
        >
          {Reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
        </div>
    );
};

export default Review;