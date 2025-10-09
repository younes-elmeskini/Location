"use client";
import { useEffect, useState } from "react";
import CarCard from "@/components/carCard";
import { CarCardSkeleton } from "@/components/skeletonLoader";
import { motion } from "framer-motion";
import { useCarContext, Car } from "@/lib/hooks/useCarContext";

// Define the props for the component
interface MenuCarsProps {
  filter: {
    gamme: string;
    type: string;
    brand: string;
    fuelType?: string;
    transmission?: string;
  };
  excludeId?: string; // ID de la voiture à exclure
  limit?: number; // Nombre maximum de voitures à afficher
}

export default function MenuCars({ filter, excludeId, limit }: MenuCarsProps) {
  const { cars, isLoading, setCars } = useCarContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Construire les paramètres de requête
        const params = new URLSearchParams();
        if (filter.gamme && filter.gamme !== "All") {
          params.append("gamme", filter.gamme);
        }
        if (filter.type && filter.type !== "All") {
          params.append("carType", filter.type);
        }
        if (filter.brand && filter.brand !== "All") {
          params.append("brand", filter.brand);
        }
        if (filter.fuelType && filter.fuelType !== "All") {
          params.append("fuelType", filter.fuelType);
        }
        if (filter.transmission && filter.transmission !== "All") {
          params.append("transmission", filter.transmission);
        }
        if (limit && limit > 0) {
          params.append("limit", limit.toString());
        }

        const queryString = params.toString();
        const res = await fetch(`/api/cars${queryString ? `?${queryString}` : ""}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const filteredCars = excludeId 
            ? data.filter((car: Car) => car.id !== excludeId)
            : data;
          setCars(filteredCars);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Network error occurred");
      }
    };

    fetchCars();
  }, [filter, excludeId, limit]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6 my-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Filtrer les voitures pour exclure celle spécifiée
  const filteredCars = excludeId 
    ? cars.filter((car) => car.id !== excludeId)
    : cars;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6 my-6">
      {filteredCars.length === 0 && <p className="text-center">Aucune voiture disponible.</p>}
      {filteredCars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <CarCard {...car} />
        </motion.div>
      ))}
    </div>
  );
}
