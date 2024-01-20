"use client";

import Image from "next/image";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { imageLoader } from "@/lib/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as TSwiper } from "swiper/types";

type GalleryProps = {
  images: string[];
  themeColor?: string;
};

const Gallery: React.FC<GalleryProps> = ({ images, themeColor }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);

  return (
    <>
      <h2
        style={{ color: themeColor }}
        className="text-3xl font-semibold mb-[20px]"
      >
        Gallery
      </h2>
      <div>
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
                  loader={imageLoader}
                  src={`${image}`}
                  alt="gallery image"
                  width={300}
                  height={300}
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
                  loader={imageLoader}
                  src={`${image}`}
                  alt="gallery image"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Gallery;
