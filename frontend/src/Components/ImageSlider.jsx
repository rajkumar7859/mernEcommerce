import React from 'react';
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Styles/Swiper.css";

const ImageSlider = () => {
  
    const images = [
        {
          url: "https://img.freepik.com/premium-photo/shopping-trolley-blue-background-with-some-copy-space_348487-393.jpg",
        },
        {
          url: "https://img.freepik.com/premium-photo/shopping-trolley-blue-background-with-some-copy-space_348487-393.jpg",
        },
        {
          url: "https://img.freepik.com/premium-photo/shopping-trolley-blue-background-with-some-copy-space_348487-393.jpg",
        },
      ];

  return (
    <div >
       <Swiper style={{paddingTop:"57px"}}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
            images?.map((sliderImg)=>{
              return <SwiperSlide ><img className='md:w-full lg:w-full sm:w-full' src={sliderImg.url} key={sliderImg.url} alt="slider" style={{height:"22rem"}} /></SwiperSlide>
            })
        }
      </Swiper>
    </div>
  );
};

export default ImageSlider;
