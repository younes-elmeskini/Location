"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
type Car = {
  id: string;
  name: string;
  type: string;
  price: string;
  seats: number;
  dors: number;
  transmission: string;
  fuelType: string;
  airConditioning: boolean;
  cover: string;
};

export default function EditCarForm() {
  const params = useParams();
  const carId = params?.id;

  const [car, setCar] = useState<Car | null>(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    seats: 0,
    dors: 0,
    transmission: "",
    fuelType: "",
    airConditioning: false,
  });
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(true);

  // Fetch car data
  useEffect(() => {
    if (!carId) {
      console.log("No carId found");
      return;
    }

    console.log("Fetching car with ID:", carId);
    setIsLoadingCar(true);
    
    fetch(`/api/cars/${carId}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch car");
        return res.json();
      })
      .then((responseData) => {
        console.log("Car data received:", responseData);
        
        // L'API peut retourner soit un objet, soit un tableau
        const data: Car = Array.isArray(responseData) ? responseData[0] : responseData;
        
        if (!data) {
          throw new Error("Aucune donnée de voiture trouvée");
        }
        
        console.log("Processed car data:", data);
        setCar(data);
        
        // Mise à jour du formulaire avec les données de la voiture
        const updatedForm = {
          name: data.name || "",
          type: data.type || "",
          price: data.price || "",
          seats: Number(data.seats) || 0,
          dors: Number(data.dors) || 0,
          transmission: data.transmission || "",
          fuelType: data.fuelType || "",
          airConditioning: Boolean(data.airConditioning),
        };
        
        console.log("Updated form:", updatedForm);
        setForm(updatedForm);
        setPreview(data.cover || "");
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
        alert("Erreur lors du chargement de la voiture: " + error.message);
      })
      .finally(() => {
        setIsLoadingCar(false);
      });
  }, [carId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: target.checked }));
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      setForm((prev) => ({ ...prev, [name]: Number(target.value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: target.value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (cover) formData.append("cover", cover);

    try {
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        alert("Voiture mise à jour avec succès !");
      } else {
        const error = await res.text();
        alert("Erreur lors de la mise à jour : " + error);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingCar) {
    return (
      <div className="max-w-lg mx-auto p-4 text-center">
        <p className="text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-lg mx-auto p-4 text-center">
        <p className="text-red-600">Voiture non trouvée</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-semibold mb-4">Modifier la Voiture</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom de la voiture"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prix</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Prix"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sièges</label>
          <input
            name="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            placeholder="Nombre de sièges"
            className="w-full border px-3 py-2 rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Portes</label>
          <input
            name="dors"
            type="number"
            value={form.dors}
            onChange={handleChange}
            placeholder="Nombre de portes"
            className="w-full border px-3 py-2 rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Transmission</label>
          <input
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            placeholder="Transmission"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type de carburant</label>
          <input
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            placeholder="Type de carburant"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="airConditioning"
            checked={form.airConditioning}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Climatisation</span>
        </label>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Changer l&apos;image </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />
          {preview && (
            <Image src={preview} alt="Aperçu" className="mt-3 w-48 rounded border" width={100} height={100} />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
      >
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
    </form>
  );
}