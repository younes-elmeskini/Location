import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <motion.div 
      className="p-6 rounded-[16px] bg-[#fafafa] shadow-lg max-w-[400px] cursor-pointer card-hover" 
      onClick={() => (window.location.href = `/cars/${car.id}`)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Image
          src={car.cover}
          alt="car"
          width={400}
          height={200}
          className="w-full h-[200px] object-cover rounded-[12px] shadow-lg"
        />
      </motion.div>
      <motion.div 
        className="flex justify-between w-full my-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="text-left">
          <h3 className="md:text-[24px] font-semibold">{car.name}</h3>
          <p>{car.type}</p>
        </div>
        <div className="text-right">
          <p className="md:text-[24px] text-[#5937E0] font-bold">{car.price}</p>
          <span>/day</span>
        </div>
      </motion.div>
      <motion.div 
        className="flex justify-between w-full text-[14px] md:text-[16px]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
      >
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
      </motion.div>
    </motion.div>
  );
}
