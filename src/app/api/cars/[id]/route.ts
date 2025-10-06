import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = (await params) as any;
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
  { params }: { params: { id: string } }
) {
  const { id } = await params as any;
  await prisma.car.delete({ where: { id } });
  return new Response(null, { status: 204 });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

//   let userId: string;
//   try {
//     const payload = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "your-secret-key"
//     ) as any;
//     userId = payload.userId as string;
//   } catch {
//     return Response.json({ error: "Invalid token" }, { status: 401 });
//   }

//   const { id } = params;
//   const formData = await req.formData();

//   const name = formData.get("name") as string;
//   const type = formData.get("type") as string;
//   const price = formData.get("price") as string;
//   const seats = parseInt(formData.get("seats") as string);
//   const dors = parseInt(formData.get("dors") as string);
//   const transmission = formData.get("transmission") as string;
//   const fuelType = formData.get("fuelType") as string;
//   const airConditioning = formData.get("airConditioning") === "true";

//   const cover = formData.get("cover") as File | null;
//   let coverUrl: string | undefined;

//   // 🔹 If a new image is provided, upload to Cloudinary
//   if (cover) {
//     const arrayBuffer = await cover.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const uploadResult = await new Promise<any>((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: "cars" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(buffer);
//     });

//     coverUrl = uploadResult.secure_url;
//   }

//   try {
//     const updatedCar = await prisma.car.update({
//       where: { id },
//       data: {
//         name,
//         type,
//         price,
//         seats,
//         dors,
//         transmission,
//         fuelType,
//         airConditioning,
//         ...(coverUrl && { cover: coverUrl }), // Only update cover if new image uploaded
//       },
//     });

//     return Response.json(updatedCar, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to update car" }, { status: 500 });
//   }
// }
