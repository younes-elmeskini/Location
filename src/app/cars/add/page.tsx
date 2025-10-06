"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import ListCars from "@/components/listCars";

export default function AddCarForm() {
  const router = useRouter();

  // --- Auth state ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // --- Form states ---
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState<Brand | "">("");
  const [gamme, setGamme] = useState<PriceRange | "">("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState(4);
  const [dors, setDors] = useState(4);
  const [transmission, setTransmission] = useState<Transmission | "">("");
  const [fuelType, setFuelType] = useState<FuelType | "">("");
  const [airConditioning, setAirConditioning] = useState(false);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // --- Auth check ---
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        router.replace("/auth/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) setIsAuthenticated(true);
        else {
          setIsAuthenticated(false);
          router.replace("/auth/login");
        }
      } catch (error: unknown) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        router.replace("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  // --- Submit handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cover) return setMessage("Cover image is required");
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("seats", seats.toString());
    formData.append("dors", dors.toString());
    formData.append("transmission", transmission);
    formData.append("fuelType", fuelType);
    formData.append("airConditioning", airConditioning.toString());
    if (brand) formData.append("brand", brand);
    if (gamme) formData.append("gamme", gamme);
    formData.append("quantity", quantity.toString());
    if (cover) formData.append("cover", cover);

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage("Car added successfully!");

      // Reset fields
      setName("");
      setType("");
      setBrand("");
      setGamme("");
      setPrice("");
      setSeats(4);
      setDors(4);
      setTransmission("");
      setFuelType("");
      setAirConditioning(false);
      setCover(null);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10">
        <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Name */}
          <input
            type="text"
            placeholder="Car Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Car Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Car Type</option>
            {Object.values(CarType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Brand */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value as Brand)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Brand</option>
            {Object.values(Brand).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Gamme */}
          <select
            value={gamme}
            onChange={(e) => setGamme(e.target.value as PriceRange)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Gamme</option>
            {Object.values(PriceRange).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Seats / Dors */}
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Seats"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="w-1/2 border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Dors"
              value={dors}
              onChange={(e) => setDors(parseInt(e.target.value))}
              className="w-1/2 border rounded px-3 py-2"
            />
          </div>

          {/* Transmission */}
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value as Transmission)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Transmission</option>
            {Object.values(Transmission).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Fuel Type */}
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value as FuelType)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Fuel Type</option>
            {Object.values(FuelType).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {/* Air Conditioning */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={airConditioning}
              onChange={(e) => setAirConditioning(e.target.checked)}
            />
            <span>Air Conditioning</span>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setCover(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>

      {/* Car List */}
      <div>
        <ListCars />
      </div>
    </div>
  );
}
