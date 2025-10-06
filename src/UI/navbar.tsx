"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Navlinks } from "@/lib/constantes";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-interface flex justify-between py-4 md:px-[80px] px-4 items-center relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Image
          src="/images/Logo.png"
          alt="Logo du site"
          width={22.44}
          height={25}
        />
        <h2>LOGO</h2>
      </motion.div>

      <motion.button
        className="sm:hidden block z-20"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <motion.svg
          width="32"
          height="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </motion.svg>
      </motion.button>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flexCenter md:gap-[30px] md:flex hidden "
      >
        {Navlinks.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative group cursor-pointer "
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={link.href}
                className="hover:text-[#5937E0] transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-6 bg-white absolute top-full left-0 w-full py-6 px-8 z-10 sm:hidden"
          >
            {Navlinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-[#5937E0] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
