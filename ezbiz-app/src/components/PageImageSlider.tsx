"use client";

import Image from "next/image";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as TSwiper } from "swiper/types";

type PageImageSliderProps = {
  images: string[];
};

const PageImageSlider: React.FC<PageImageSliderProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`gallery-${index}`}>
            <div className="relative w-full h-[300px]">
              <Image
                src={image}
                alt="gallery image"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(s) => {
          if (!s) return;
          setThumbsSwiper(s);
        }}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`gallery-${index}`}>
            <div className="relative w-full h-[100px] cursor-pointer">
              <Image
                src={image}
                alt="gallery image"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PageImageSlider;
