"use client";
import React, { useState } from "react";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import { X, Filter } from "lucide-react";

interface FilterTypeProps {
  selectedGamme: string;
  selectedType: string;
  selectedBrand: string;
  selectedFuelType: string;
  selectedTransmission: string;
  onChangeGamme: (value: string) => void;
  onChangeType: (value: string) => void;
  onChangeBrand: (value: string) => void;
  onChangeFuelType: (valur: string) => void;
  onChangeTransmission: (value: string) => void;
}

export default function FilterType({
  selectedGamme,
  selectedType,
  selectedBrand,
  selectedFuelType,
  selectedTransmission,
  onChangeGamme,
  onChangeType,
  onChangeBrand,
  onChangeFuelType,
  onChangeTransmission,
}: FilterTypeProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-4 w-full ">
      {/* Bouton Toggle pour Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[55px] h-[55px] flex items-center justify-center bg-[#5937E0] text-white rounded-full font-bold shadow-lg hover:bg-[#4629c0] transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu de filtres */}
      <div
        className={`
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'} 
          md:translate-y-0 md:opacity-100 md:pointer-events-auto
          fixed md:relative
          bottom-0 md:bottom-auto
          left-0 md:left-auto
          right-0 md:right-auto
          bg-white
          shadow-2xl md:shadow-lg
          rounded-t-3xl md:rounded-2xl
          p-6
          z-40
          transition-all duration-300 ease-in-out
          space-y-4 md:space-y-0
          flex flex-col md:grid
          md:grid-cols-3 lg:grid-cols-5
          md:gap-4
          items-center md:items-center
          w-full 
          md:max-w-7xl
          md:mx-auto
          md:p-4
          md:bg-gradient-to-r md:from-purple-50 md:to-indigo-50
        `}
      >
        {/* Gamme */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <p className="text-[#5937E0] font-bold text-sm md:text-base whitespace-nowrap">
            Gamme:
          </p>
          <select
            value={selectedGamme}
            onChange={(e) => onChangeGamme(e.target.value)}
            className="w-full p-2 md:p-2 px-4 border border-[#5937E0] border-2 rounded-full cursor-pointer bg-white hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:ring-offset-2"
          >
            <option value="All">Toutes</option>
            {Object.values(PriceRange).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <p className="text-[#5937E0] font-bold text-sm md:text-base whitespace-nowrap">
            Type:
          </p>
          <select
            value={selectedType}
            onChange={(e) => onChangeType(e.target.value)}
            className="w-full p-2 md:p-2 px-4 border border-[#5937E0] border-2 rounded-full cursor-pointer bg-white hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:ring-offset-2"
          >
            <option value="All">Tous</option>
            {Object.values(CarType).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Marque */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <p className="text-[#5937E0] font-bold text-sm md:text-base whitespace-nowrap">
            Marque:
          </p>
          <select
            value={selectedBrand}
            onChange={(e) => onChangeBrand(e.target.value)}
            className="w-full p-2 md:p-2 px-4 border border-[#5937E0] border-2 rounded-full cursor-pointer bg-white hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:ring-offset-2"
          >
            <option value="All">Toutes</option>
            {Object.values(Brand).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Carburant */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <p className="text-[#5937E0] font-bold text-sm md:text-base whitespace-nowrap">
            Carburant:
          </p>
          <select
            value={selectedFuelType}
            onChange={(e) => onChangeFuelType(e.target.value)}
            className="w-full p-2 md:p-2 px-4 border border-[#5937E0] border-2 rounded-full cursor-pointer bg-white hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:ring-offset-2"
          >
            <option value="All">Tous</option>
            {Object.values(FuelType).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <p className="text-[#5937E0] font-bold text-sm md:text-base whitespace-nowrap">
            Transmission:
          </p>
          <select
            value={selectedTransmission}
            onChange={(e) => onChangeTransmission(e.target.value)}
            className="w-full p-2 md:p-2 px-4 border border-[#5937E0] border-2 rounded-full cursor-pointer bg-white hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:ring-offset-2"
          >
            <option value="All">Toutes</option>
            {Object.values(Transmission).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
