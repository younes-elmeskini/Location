"use client";
import { useState, useEffect } from "react";
import HeroFilter from "@/components/heroFilter";
import InfoBlock from "@/components/infoBlock";
import MenuCars from "@/components/menuCars";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      <HeroFilter />
      <InfoBlock />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 lg:px-8 xl:mx-[140px]">
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[38px] font-bold leading-tight">Choose the car that suits you</h2>
        <Link 
          href="/cars"
          className="text-blue-600 hover:text-blue-800 font-medium hidden md:block text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
        >
          View All →
        </Link>
      </div>
      <div className="flex justify-center items-center"> 
        <MenuCars filter={{ gamme: "All", type: "All", brand: "All" }} limit={6}/>
      </div>
      <Link 
          href="/cars"
          className="text-blue-600 text-center hover:text-blue-800 w-full font-medium md:hidden text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
        >
          View All →
        </Link>
    </div>
  );
}
