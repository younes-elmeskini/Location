import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, email: true } } },
  });
  return Response.json(posts);
}


export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let userId: string;
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;
    userId = payload.userId as string;
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File;

  // Upload vers Cloudinary
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "posts" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  await prisma.post.create({
    data: { title, content, image: uploadResult.secure_url, userId },
  });

  return Response.json({ message: "Post created successfully" }, { status: 201 });
}
