"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

const Banner = () => {
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, {
    once: true,
    margin: "-300px",
  });

  const animationVariants = {
    initial: {
      y: 40,
      opacity: 0,
      filter: "blur(5px)",
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate={isBannerInView ? "animate" : "initial"}
      ref={bannerRef}
      className="max-w-5xl mx-auto my-5 px-4"
    >
      <img
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1920/v1772962566/diy0ing3xujkmjfkeap0.jpg`}
        srcSet={`
    https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_640/v1772962566/diy0ing3xujkmjfkeap0.jpg 640w,
    https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1024/v1772962566/diy0ing3xujkmjfkeap0.jpg 1024w,
    https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1920/v1772962566/diy0ing3xujkmjfkeap0.jpg 1920w
  `}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
        alt="banner"
        className="h-full w-full shadow-md rounded-2xl"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </motion.div>
  );
};

export default Banner;
