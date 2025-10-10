import React, { useEffect, useState } from "react";
import CarCardAdmin from "./carCardAdmin";
import { CarCardSkeleton } from "./skeletonLoader";
import { useCarContext } from "@/lib/hooks/useCarContext";

type ListCarsProps = {
  filter?: string;
};

export default function ListCars({ filter }: ListCarsProps) {
  const { cars, isLoading, refreshCars } = useCarContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryFilter = filter || params.get("filter") || "";

        const filters = {
          gamme: queryFilter,
        };
        
        await refreshCars(filters);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    fetchCars();
  }, [filter, refreshCars]);

  if (isLoading) {
    return (
      <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-8 pr-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 transition-colors duration-200">
      <div className="space-y-8 p-4">
        {cars.length === 0 && <p className="text-center">Aucune voiture disponible.</p>}
        {cars.map((car) => (
          <CarCardAdmin key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}