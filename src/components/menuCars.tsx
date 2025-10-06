"use client";
import { useEffect, useState } from "react";
import CarCard from "@/components/carCard";

// Define the type for each car
type Car = {
  id: string;
  name: string;
  type: string;
  image?: string;
  cover: string;
  price: string;
  seats: number;
  dors: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
  [key: string]: unknown; // for any additional properties
};

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
}

export default function MenuCars({ filter, excludeId }: MenuCarsProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Build query parameters from filter object
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

        const queryString = params.toString();
        const res = await fetch(
          `/api/cars${queryString ? `?${queryString}` : ""}`
        );
        const data: unknown = await res.json();
        if (Array.isArray(data)) {
          // Exclure la voiture actuelle si excludeId est fourni
          const filteredCars = excludeId 
            ? (data as Car[]).filter((car) => car.id !== excludeId)
            : (data as Car[]);
          setCars(filteredCars);
        } else {
          setError("Invalid data format");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filter, excludeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6 my-10">
      {cars.length === 0 && <p className="text-center">No cars available.</p>}
      {cars.map((car) => (
        <CarCard key={car.id} {...car} />
      ))}
    </div>
  );
}
