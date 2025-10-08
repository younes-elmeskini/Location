import React, { useEffect, useState } from "react";
import CarCardAdmin from "./carCardAdmin";


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
  quantity:number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
  [key: string]: unknown;
};

type ListCarsProps = {
  filter?: string;
};

export default function ListCars({ filter }: ListCarsProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryFilter = filter || params.get("filter") || "";

    const fetchCars = async () => {
      try {
        const res = await fetch(
          `/api/cars${queryFilter ? `?filter=${queryFilter}` : ""}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          setError("Invalid data format");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-6 my-6">
    {cars.length === 0 && <p className="text-center">No cars available.</p>}
    {cars.map((car) => (
      <CarCardAdmin key={car.id} {...car} />
    ))}
  </div>
  );
}