import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const registration = await db.professionalRegistration.update({
      where: { id },
      data: { ...(status && { status }) },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al actualizar." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.professionalRegistration.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Registro eliminado." });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al eliminar." },
      { status: 500 }
    );
  }
}
