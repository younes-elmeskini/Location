import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the type for each car
type Car = {
  id: number;
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



  const handleDelete = async (car: Car) => {
    console.log("Delete car", car);
    await fetch(`/api/cars/${car.id}`, { method: 'DELETE' })
    setCars(prev => prev.filter(c => c.id !== car.id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <table className="min-w-full border border-gray-300 border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Type</th>
          <th className="px-4 py-2 border">Price</th>
          <th className="px-4 py-2 border">Seats</th>
          <th className="px-4 py-2 border">Doors</th>
          <th className="px-4 py-2 border">Transmission</th>
          <th className="px-4 py-2 border">Fuel</th>
          <th className="px-4 py-2 border">AC</th>
          <th className="px-4 py-2 border">Cover</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={car.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 text-center`}>
            <td className="px-4 py-2 border">{car.name}</td>
            <td className="px-4 py-2 border">{car.type}</td>
            <td className="px-4 py-2 border">{car.price}</td>
            <td className="px-4 py-2 border">{car.seats}</td>
            <td className="px-4 py-2 border">{car.dors}</td>
            <td className="px-4 py-2 border">{car.transmission}</td>
            <td className="px-4 py-2 border">{car.fuelType}</td>
            <td className="px-4 py-2 border">{car.airConditioning ? "Yes" : "No"}</td>
            <td className="px-4 py-2 border">
              {car.cover && <Image src={car.cover} alt={car.name} className="h-12 mx-auto" width={100} height={100} />}
            </td>
            <td className="px-4 py-2 border space-x-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => (window.location.href = `/cars/${car.id}/edit`)} 
                
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(car)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}