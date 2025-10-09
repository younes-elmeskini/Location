"use client";
import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useCarContext } from "@/lib/hooks/useCarContext";

type Props = {
  id: string;
};

export default function ActionButtons({ id }: Props){
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteCar, refreshCars } = useCarContext();

  const handleDelete = async (carId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cars/${carId}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        // Supprimer la voiture du contexte pour mise à jour immédiate
        deleteCar(carId);
        
        // Rafraîchir la liste complète pour s'assurer de la cohérence
        setTimeout(() => {
          refreshCars();
        }, 500);
      } else {
        console.error("Erreur lors de la suppression");
        alert("Erreur lors de la suppression de la voiture");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression de la voiture");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className=" absolute top-2 right-1  text-left">
      {/* Button trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaEllipsisV className="text-gray-600" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false)
                window.location.href = `/admin/${id}` 
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
            >
              <FaEdit className="text-blue-500" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                handleDelete(id)
              }}
              disabled={isDeleting}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash className="text-red-500" />
              <span>{isDeleting ? "Suppression..." : "Supprimer"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}