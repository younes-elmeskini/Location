"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CarDetais from "@/components/carDetais";
import MenuCars from "@/components/menuCars";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<{
    id: string;
    name: string;
    type: string;
    cover: string;
    price: string;
    seats: number;
    dors: number;
    transmission: string;
    fuelType: string;
    airConditioning: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;
  
  return (
    <div className="flex flex-col justify-center items-center">
      <CarDetais car={car} />
      <div className="mt-[140px]">
        <h2 className="text-[40px] font-bold mt-4">Other {car.type} cars</h2>
        <MenuCars 
          filter={{ 
            gamme: "All", 
            type: car.type, 
            brand: "All", 
            fuelType: "All", 
            transmission: "All" 
          }}
          excludeId={car.id}
        />
      </div>
    </div>
  );
}
