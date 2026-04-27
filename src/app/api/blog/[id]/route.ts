import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, published } = body;

    const post = await db.blogPost.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content && { content }),
        ...(coverImage !== undefined && { coverImage }),
        ...(published !== undefined && {
          published,
          publishedAt: published ? published ? new Date() : null : undefined,
        }),
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Blog PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar el artículo." },
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
    await db.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Artículo eliminado." });
  } catch (error) {
    console.error("Blog DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Error al eliminar el artículo." },
      { status: 500 }
    );
  }
}
