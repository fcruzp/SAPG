import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sapg2025fp";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, authenticated: true });
    }

    return NextResponse.json(
      { success: false, error: "Contraseña incorrecta." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Error de autenticación." },
      { status: 500 }
    );
  }
}
