"use client";
import { useState, useEffect } from "react";
import HeroFilter from "@/components/heroFilter";
import InfoBlock from "@/components/infoBlock";
import MenuCars from "@/components/menuCars";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";

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
      <div className="flex justify-center items-center"> 
        <MenuCars filter={{ gamme: "All", type: "All", brand: "All" }}/>
      </div>
    </div>
  );
}
