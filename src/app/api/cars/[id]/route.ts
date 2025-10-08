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
} from "@prisma/client";
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
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
      quantity:true,
      transmission: true,
      fuelType: true,
      airConditioning: true,
    },
  });
  if (!car) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(car);
}


export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await prisma.car.delete({ where: { id } });
  return new Response(null, { status: 204 });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
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
  const cover = formData.get("cover") as File;
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
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "cars" }, (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        })
        .end(buffer);
    });

    coverUrl = uploadResult.secure_url;
  }

  try {
    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        name: name,
        cover: coverUrl,
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
      },
    });

    return Response.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update car" }, { status: 500 });
  }
}
