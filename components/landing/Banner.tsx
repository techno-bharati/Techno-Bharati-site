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
      <Image
        src={"/banner.png"}
        alt="banner"
        className="h-full w-full shadow-md rounded-2xl"
        height={800}
        width={800}
      />
    </motion.div>
  );
};

export default Banner;
