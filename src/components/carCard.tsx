import React from "react";
import Image from "next/image";
type Car = {
  id: string;
  name: string;
  type: string;
  cover: string;
  price: string;
  seats: number;
  dors: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
};

export default function CarCard(car: Car) {
  return (
    <div className="p-6 rounded-[16px] bg-[#fafafa] shadow-lg max-w-[350px] hover:scale-[1.05] transition-transform duration-300" onClick={() => (window.location.href = `/cars/${car.id}`)}>
      <div>
        <Image
          src={car.cover}
          alt="car"
          width={400}
          height={200}
          className="w-full h-[200px] object-cover rounded-[12px] shadow-lg"
        />
      </div>
      <div className="flex justify-between w-full my-2">
        <div className="text-left">
          <h3 className="md:text-[24px] font-semibold">{car.name}</h3>
          <p>{car.type}</p>
        </div>
        <div className="text-right">
          <p className="md:text-[24px] text-[#5937E0] font-bold">{car.price}</p>
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
          <p>{car.transmission}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/fuel.png"
            alt="fuel"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>{car.fuelType}</p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/air.png"
            alt="air"
            width={24}
            height={24}
            className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
          />
          <p>{car.airConditioning?"A/C":"No A/C"}</p>
        </div>
      </div>
    </div>
  );
}
