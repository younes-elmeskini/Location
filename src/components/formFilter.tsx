"use client";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CarFilterForm() {
  const router = useRouter();
  const [carType, setCarType] = useState<string>("All");
  const [brand, setBrand] = useState<string>("All");
  const [gamme, setGamme] = useState<string>("All");
  const [fuelType, setFuelType] = useState<string>("All");
  const [transmission, setTransmission] = useState<string>("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (carType && carType !== "All") params.append("carType", carType);
    if (brand && brand !== "All") params.append("brand", brand);
    if (gamme && gamme !== "All") params.append("gamme", gamme);
    if (fuelType && fuelType !== "All") params.append("fuelType", fuelType);
    if (transmission && transmission !== "All") params.append("transmission", transmission);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-[14px] md:text-[16px] gap-4"
    >
      {/* Car Type */}
      <select
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
        className="w-full p-3 border-none rounded-[12px] bg-[#FAFAFA]"
      >
        <option value="All">Car Type</option>
        {Object.values(CarType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full p-3 border-none rounded-[12px] bg-[#FAFAFA]"
      >
        <option value="All">Brand</option>
        {Object.values(Brand).map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {/* Price Range / Gamme */}
      <select
        value={gamme}
        onChange={(e) => setGamme(e.target.value)}
        className="w-full p-3 border-none rounded-[12px] bg-[#FAFAFA]"
      >
        <option value="All">Gamme</option>
        {Object.values(PriceRange).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {/* Fuel Type */}
      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        className="w-full p-3 border-none rounded-[12px] bg-[#FAFAFA]"
      >
        <option value="All">Fuel Type</option>
        {Object.values(FuelType).map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {/* Transmission */}
      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
        className="w-full p-3 border-none rounded-[12px] bg-[#FAFAFA]"
      >
        <option value="All">Transmission</option>
        {Object.values(Transmission).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-6 py-3 bg-[#FF9E0C] text-white rounded-[12px] hover:bg-[#7c5dfa] transition-colors duration-300"
      >
        Réserver maintenant
      </button>
    </form>
  );
}
