import React from "react";
import Image from "next/image";
import Link from "next/link";
type Car = {
  id: string;
  name: string;
  type: string;
  cover: string;
  price: string;
  seats: number;
  dors: number;
  quantity:number,
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
};

export default function CarCard(car: Car) {
  return (
    <Link href={`/cars/${car.id}`} className="block">
    <article className="p-6 flex flex-col md:flex-row rounded-[16px] bg-[#fafafa] shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <Image
          src={car.cover}
          alt={`${car.name} - ${car.type}`}
          width={300}
          height={200}
          className="w-full md:w-[300px] h-[200px] object-cover rounded-[12px] shadow-md"
          priority={false}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 md:ml-6 mt-4 md:mt-0">
        {/* Header with name and price */}
        <div className="flex justify-between items-start w-full mb-4">
          <div>
            <h3 className="text-lg md:text-[24px] font-semibold text-gray-900">
              {car.name}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{car.type}</p>
          </div>
          <div className="text-right">
            <p className="text-lg md:text-[24px] text-[#5937E0] font-bold">
              {car.price}
            </p>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-3 gap-4 w-full text-[14px] md:text-[16px]">
          {/* Transmission */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/gear.png"
              alt="Transmission type"
              width={24}
              height={24}
            />
            <p className="text-gray-700">{car.transmission}</p>
          </div>

          {/* Fuel Type */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/fuel.png"
              alt="Fuel type"
              width={24}
              height={24}
            />
            <p className="text-gray-700">{car.fuelType}</p>
          </div>

          {/* Air Conditioning */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/air.png"
              alt="Air conditioning"
              width={24}
              height={24}
            />
            <p className="text-gray-700">
              {car.airConditioning ? "A/C" : "No A/C"}
            </p>
          </div>

          {/* Doors */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/dors.png"
              alt="Number of doors"
              width={24}
              height={24}
            />
            <p className="text-gray-700">{car.dors} doors</p>
          </div>

          {/* Seats */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/seat.png"
              alt="Number of seats"
              width={24}
              height={24}
            />
            <p className="text-gray-700">{car.seats} seats</p>
          </div>

          {/* Quantity */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/icons/hatchback.png"
              alt="Available quantity"
              width={38}
              height={36}
            />
            <p className="text-gray-700">{car.quantity} Cars</p>
          </div>
        </div>
      </div>
    </article>
  </Link>
  );
}
