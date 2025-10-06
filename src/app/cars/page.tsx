"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FilterType from "@/components/filterType";
import MenuCars from "@/components/menuCars";

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [gamme, setGamme] = useState("All");   // Price range
  const [type, setType] = useState("All");     // Car type
  const [brand, setBrand] = useState("All");  
  const [fuelType, setFuelType] = useState("All");
  const [transmission, setTransmission] = useState("All");

  // Lire les paramètres de l'URL au chargement de la page
  useEffect(() => {
    const urlGamme = searchParams.get("gamme");
    const urlType = searchParams.get("carType");
    const urlBrand = searchParams.get("brand");
    const urlFuelType = searchParams.get("fuelType");
    const urlTransmission = searchParams.get("transmission");
    
    if (urlGamme) setGamme(urlGamme);
    if (urlType) setType(urlType);
    if (urlBrand) setBrand(urlBrand);
    if (urlFuelType) setFuelType(urlFuelType);
    if (urlTransmission) setTransmission(urlTransmission);
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center">
      <FilterType
        selectedGamme={gamme}
        selectedType={type}
        selectedBrand={brand}
        onChangeGamme={setGamme}
        onChangeType={setType}
        onChangeBrand={setBrand}
      />
      <MenuCars filter={{ gamme, type, brand, fuelType, transmission }} />
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading cars...</div>}>
      <CarsPageContent />
    </Suspense>
  );
}
