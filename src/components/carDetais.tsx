"use client";
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

interface CarDetaisProps {
  car: Car;
}

export default function carDetais({ car }: CarDetaisProps) {
  
  console.log("salaaaaaaaaaaaaaam",car);
  if (!car) return <p>Car not found</p>;
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] justify-center items-start px-4 lg:px-0">
      <div className="w-full lg:w-auto">
        <h2 className="text-2xl md:text-[40px] font-bold">{car.name}</h2>
        <p className="text-[#5937E0] text-xl md:text-[24px] font-bold flex items-center gap-2">
          {car.price}{" "}
          <span className="text-sm md:text-[14px] font-normal text-[#00000060]">
            /day
          </span>
        </p>
        <Image
          src={car.cover}
          alt="cars"
          width={600}
          height={260}
          className="rounded-[20px] mt-4 w-full w-[600px] h-auto object-cover shadow-lg"
        />
      </div>

      <div className="w-full lg:w-auto">
        <h3 className="text-xl md:text-[24px] font-bold my-4">
          Technical Specification
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px]">
            <Image src="/icons/gear.png" alt="car" width={24} height={24} />
            <p>Gear Box</p>
            <p className="font-semibold">{car.transmission}</p>
          </div>
          <div className="bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px]">
            <Image src="/icons/fuel.png" alt="car" width={24} height={24} />
            <p>Fuel</p>
            <p className="font-semibold">{car.fuelType}</p>
          </div>
          <div className="bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px]">
            <Image src="/icons/dors.png" alt="car" width={24} height={24} />
            <p>Doors</p>
            <p className="font-semibold">{car.dors}</p>
          </div>
          <div className="bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px]">
            <Image src="/icons/air.png" alt="car" width={24} height={24} />
            <p>Air Conditioner</p>
            <p className="font-semibold">
              {car.airConditioning ? "A/C" : "No A/C"}
            </p>
          </div>
          <div className="bg-[#fafafa] p-3 md:p-4 rounded-[20px] w-full md:w-[150px] flex-col gap-2 md:gap-4 flex justify-center items-start shadow-md text-sm md:text-[16px] col-span-2 md:col-span-1">
            <Image src="/icons/seat.png" alt="car" width={24} height={24} />
            <p>Seats</p>
            <p className="font-semibold">{car.seats}</p>
          </div>
        </div>
        <button className="bg-[#5937E0] w-full md:min-w-[290px] text-white py-3 rounded-[12px] hover:bg-[#7c5dfa] transition-colors duration-300 mt-6 md:mt-10">
          Rent Now
        </button>
      </div>
    </div>
  );
}
