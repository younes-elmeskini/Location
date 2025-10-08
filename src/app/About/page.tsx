"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AboutSkeleton } from "@/components/skeletons/AboutSkeleton";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AboutSkeleton />;
  }
  return (
    <div className="p-6 rounded-[16px] bg-[#fafafa] shadow-lg max-w-[350px] hover:scale-[1.05] transition-transform duration-300">
      <div>
        <Image
          src="/cars/bmm3.png"
          alt=""
          width={400}
          height={200}
          className="w-full h-[200px] object-cover rounded-[12px] shadow-lg"
        />
      </div>
      <div className="flex justify-between w-full my-2">
        <div className="text-left">
          <h3 className="md:text-[24px] font-semibold">BMW M3</h3>
          <p>Berline</p>
        </div>
        <div className="text-right">
          <p className="md:text-[24px] text-[#5937E0] font-bold">50 Mad</p>
          <span>/day</span>
        </div>
      </div>
      <div className="flex justify-between w-full text-[14px] md:text-[16px]">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/gear.png"
            alt="gear"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>Automat</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/fuel.png"
            alt="fuel"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>Petrol</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/air.png"
            alt="air"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>No A/C</p>
        </div>
      </div>
    </div>
  );
}
