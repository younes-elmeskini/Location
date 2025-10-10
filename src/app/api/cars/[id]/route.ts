import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
  Brand,
  FuelType,
  PriceRange,
  Transmission,
  CarType,
  Car,
} from "@prisma/client";
import { NextRequest } from "next/server";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const car = await prisma.car.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      cover: true,
      price: true,
      seats: true,
      dors: true,
      quantity: true,
      transmission: true,
      fuelType: true,
      airConditioning: true,
    },
  });

  if (!car) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(car);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Vérifier l'authentification
  const token = (await cookies()).get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    const userId = payload.userId;
    console.log("userId", userId);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    // Vérifier que la voiture existe avant de la supprimer
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      return Response.json({ error: "Voiture non trouvée" }, { status: 404 });
    }

    await prisma.car.delete({ where: { id } });
    
    return Response.json(
      { message: "Voiture supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return Response.json(
      { error: "Erreur lors de la suppression de la voiture" },
      { status: 500 }
    );
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const token = (await cookies()).get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    const userId = payload.userId;
    console.log("userId", userId);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const cover = formData.get("cover") as File | null;
  const price = formData.get("price") as string;
  const brand = formData.get("brand") as Brand;
  const gamme = formData.get("gamme") as PriceRange;
  const fuelType = formData.get("fuelType") as FuelType;
  const transmission = formData.get("transmission") as Transmission;
  const type = formData.get("type") as CarType;
  const seats = parseInt(formData.get("seats") as string);
  const dors = parseInt(formData.get("dors") as string);
  const quantity = parseInt(formData.get("quantity") as string);
  const airConditioning = formData.get("airConditioning") === "true";

  let coverUrl: string | undefined;

  // 🔹 If a new image is provided, upload to Cloudinary
  if (cover) {
    const arrayBuffer = await cover.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "cars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        ).end(buffer);
      }
    );

    coverUrl = uploadResult.secure_url;
  }

  try {
    // Construire l'objet de données à mettre à jour
    const updateData: Partial<Car> = {
      name,
      type,
      price,
      gamme,
      brand,
      seats,
      dors,
      transmission,
      fuelType,
      quantity,
      airConditioning,
    };

    // Ne mettre à jour l'image que si une nouvelle image a été fournie
    if (coverUrl) {
      updateData.cover = coverUrl;
    }

    const updatedCar = await prisma.car.update({
      where: { id },
      data: updateData,
    });

    return Response.json({
      message: "Voiture mise à jour avec succès",
      car: updatedCar
    }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return Response.json({ 
      error: "Erreur lors de la mise à jour de la voiture",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
