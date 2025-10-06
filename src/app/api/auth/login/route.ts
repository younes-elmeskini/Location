import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

function generateToken(user: any) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "24h" }
  );
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(user);
  if (!token) {
    return Response.json({ message: "Identifiants invalides" }, { status: 401 });
  }
  const isProduction = process.env.NODE_ENV === "production";
  return Response.json({ message: "Login successful" }, { status: 200, headers: {
    "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
  } });
}