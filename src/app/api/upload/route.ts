import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".png";
    const filename = `upload-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads");

    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/images/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Error al subir la imagen." },
      { status: 500 }
    );
  }
}
