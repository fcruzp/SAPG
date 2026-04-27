import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      cedula,
      profession,
      specialty,
      institution,
      city,
      province,
      motivation,
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !cedula || !profession) {
      return NextResponse.json(
        { success: false, error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    // Check for duplicate cedula
    const existingByCedula = await db.professionalRegistration.findUnique({
      where: { cedula },
    });
    if (existingByCedula) {
      return NextResponse.json(
        { success: false, error: "Ya existe un registro con esta cédula de identidad." },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingByEmail = await db.professionalRegistration.findUnique({
      where: { email },
    });
    if (existingByEmail) {
      return NextResponse.json(
        { success: false, error: "Ya existe un registro con este correo electrónico." },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await db.professionalRegistration.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        cedula,
        profession,
        specialty: specialty || null,
        institution: institution || null,
        address: null,
        city: city || "Santo Domingo",
        province: province || "Distrito Nacional",
        motivation: motivation || null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registro exitoso. Tu solicitud ha sido enviada.",
      id: registration.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registrations = await db.professionalRegistration.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const stats = await db.professionalRegistration.count();

    return NextResponse.json({
      success: true,
      total: stats,
      registrations,
    });
  } catch (error) {
    console.error("GET registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
