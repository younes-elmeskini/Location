import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Supprimer le cookie de token
    cookieStore.delete("token");
    
    return NextResponse.json(
      { message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
