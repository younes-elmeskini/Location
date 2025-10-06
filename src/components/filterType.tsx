"use client";
import React from "react";
import {
  CarType,
  Brand,
  PriceRange,
} from "@prisma/client";

interface FilterTypeProps {
  selectedGamme: string;
  selectedType: string;
  selectedBrand: string;
  onChangeGamme: (value: string) => void;
  onChangeType: (value: string) => void;
  onChangeBrand: (value: string) => void;
}

export default function FilterType({
  selectedGamme,
  selectedType,
  selectedBrand,
  onChangeGamme,
  onChangeType,
  onChangeBrand,
}: FilterTypeProps) {
  return (
    <div className="my-6 md:my-10 px-4 w-2/3 flex">
      {/* Dropdowns pour mobile */}
      <div className=" space-y-4 flex flex-col md:flex-row justify-between items-center md:items-start w-full md:mx-[100px] ">
        <div className="flex  items-center gap-2">
          <p className="text-[#5937E0] font-bold">Gamme:</p>
          <select
            value={selectedGamme}
            onChange={(e) => onChangeGamme(e.target.value)}
            className="p-2 px-6 border border-[#5937E0] border-2 rounded-[50px] cursor-pointer "
          >
            <option value="All">All</option>
            {Object.values(PriceRange).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  items-center gap-2">
          <p className="text-[#5937E0] font-bold">Type of car:</p>

          <select
            value={selectedType}
            onChange={(e) => onChangeType(e.target.value)}
            className="p-2 px-6 border border-[#5937E0] border-2 rounded-[50px] cursor-pointer "
          >
            <option value="All">All</option>
            {Object.values(CarType).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  items-center gap-2">
          <p className="text-[#5937E0] font-bold">Brand:</p>
          <select
            value={selectedBrand}
            onChange={(e) => onChangeBrand(e.target.value)}
            className="p-2 px-6 border border-[#5937E0] border-2 rounded-[50px] cursor-pointer "
          >
            <option value="All">All</option>
            {Object.values(Brand).map((option) => (
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
