"use client";
import HeroFilter from "@/components/heroFilter";
import InfoBlock from "@/components/infoBlock";
import MenuCars from "@/components/menuCars";

export default function Home() {


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
