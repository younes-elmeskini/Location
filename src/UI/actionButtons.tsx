"use client";
import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  id: string;
};


export default function ActionButtons({ id }: Props){
  const [open, setOpen] = useState(false);

  const handleDelete = async (id:string) => {
    await fetch(`/api/cars/${id}`, { method: 'DELETE' })
  };

  return (
    <div className=" absolute top-2 right-2  text-left">
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