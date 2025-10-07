"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface ActionButtonsProps {
  id: string; // Car ID or any unique identifier
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function ActionButtons({ id, onDelete, onEdit }: ActionButtonsProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative inline-block text-left">
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
                setOpen(false);
                if (onEdit) onEdit(id);
                else router.push(`/cars/edit/${id}`);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
            >
              <FaEdit className="text-blue-500" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onDelete(id);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition"
            >
              <FaTrash className="text-red-500" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}