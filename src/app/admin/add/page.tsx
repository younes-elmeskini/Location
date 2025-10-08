"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListCars from "@/components/listCars";
import AddForm from "@/components/addForm";

export default function AddCarForm() {
  const router = useRouter();

  // --- Auth state ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

  return (
    <div>
      <div>
        <AddForm />
      </div>
      {/* Car List */}
      <div>
        <ListCars />
      </div>
    </div>
  );
}
