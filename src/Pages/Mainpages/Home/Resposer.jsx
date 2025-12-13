import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import amzon from "../../../assets/brands/amazon.png";
import amzonVacto from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonsta from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";
const product = [amzon, amzonVacto, casio, moonsta, randstad, start_people];

const Resposer = () => {
  return (
    <div className="pb-3 text-center">
        <h2 className="text-3xl font-semibold py-6">Our Resposer  teams</h2>
       < Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      //  loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
    >
     {
    product.map((card,index)=> <SwiperSlide key={index}>
        <img src={card} alt="" />
    </SwiperSlide>)
     }

    </Swiper>
  
    </div>
  );
};

export default Resposer;








