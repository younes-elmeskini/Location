"use client";
import { useState, useEffect } from "react";
import HeroFilter from "@/components/heroFilter";
import InfoBlock from "@/components/infoBlock";
import MenuCars from "@/components/menuCars";
import { HomeSkeleton } from "@/components/skeletons/HomeSkeleton";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 lg:px-8 xl:mx-[140px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[38px] font-bold leading-tight">
          Choose the car that suits you
        </h2>
        <Link
          href="/cars"
          className="text-blue-600 hover:text-blue-800 font-medium hidden md:block text-sm sm:text-base transition-colors duration-200 whitespace-nowrap"
        >
          View All →
        </Link>
      </motion.div>
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <MenuCars
          filter={{ gamme: "All", type: "All", brand: "All" }}
          limit={6}
        />
      </motion.div>
      <div className="flex justify-center mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/cars"
            className="relative text-blue-600 text-center font-medium md:hidden text-sm sm:text-base w-full transition-colors duration-300 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-1/2 after:transition-all after:duration-300"
          >
            View All →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
