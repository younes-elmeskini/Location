"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListCars from "@/components/listCars";
import AddForm from "@/components/addForm";
import { LoadingPage } from "@/components/circularLoader";

export default function AddCarForm() {
  const router = useRouter();

  // --- Auth state ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // --- Auth check ---
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/verify", { method: "GET" });
        if (!isMounted) return;
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/auth/login");
        }
      } catch (error: unknown) {
        if (!isMounted) return;
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        router.replace("/auth/login");
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isAuthenticated === null) return <LoadingPage text="Vérification de l'authentification..." />;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-6 justify-center ">
        <AddForm />
      {/* Car List */}
      <div>
        <ListCars />
      </div>
    </div>
  );
}
