import React from "react";
import SectionAnimation from "./animations/SectionAnimation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroContact() {
  return (
    <div className="relative bg-[url(/images/Hero.png)] bg-cover bg-center h-auto text-white rounded-[32px] overflow-hidden shadow-lg mx-[20px] md:mx-[80px] my-6 md:my-[40px] p-6 md:p-[72px]">
      <SectionAnimation direction="left" delay={0.2}>
        <div className="space-y-6 text-center md:text-left md:flex md:items-center md:justify-between w-full ">
          <SectionAnimation direction="left" delay={0.2}>
            <motion.h1
              className="font-extrabold text-[32px] md:text-[64px] leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-[14px] md:text-[18px] text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              We’re here to help you with all your car rental needs. Get in
              touch for more information or support.
            </motion.p>
          </SectionAnimation>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link href="/contact">
              <button className="px-6 py-3 bg-[#FF9E0C] rounded-[12px] font-semibold hover:bg-[#7c5dfa] transition-all duration-300 transform hover:scale-105 shadow-md">
                Contact Us
              </button>
            </Link>
          </motion.div>
        </div>
      </SectionAnimation>
    </div>
  );
}
