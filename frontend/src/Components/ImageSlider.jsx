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
          url: "https://picsum.photos/id/20/300/200",
        },
        {
          url: "https://picsum.photos/id/30/300/200",
        },
      ];

  return (
    <div >
       <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {
            images?.map((sliderImg)=>{
              return <SwiperSlide><img src={sliderImg.url} alt="slider" /></SwiperSlide>
            })
        }
       
        {/* <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg> */}
        {/* <span ref={progressContent}></span> */}
        {/* </div> */}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
