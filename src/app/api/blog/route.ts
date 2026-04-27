import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // Get single post by slug
      const post = await db.blogPost.findUnique({
        where: { slug },
      });

      if (!post) {
        return NextResponse.json(
          { success: false, error: "Artículo no encontrado." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          author: post.author,
          publishedAt: post.publishedAt,
          coverImage: post.coverImage,
        },
      });
    }

    // Check if admin wants all posts (including drafts)
    const all = searchParams.get("all") === "true";

    // Get posts
    const posts = await db.blogPost.findMany({
      where: all ? {} : { published: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      posts: posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        content: p.content,
        author: p.author,
        published: p.published,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error("Blog GET error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, slug, excerpt, content, coverImage, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: "Título, slug y contenido son obligatorios." },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        author: "SAPG Fuerza del Pueblo",
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Artículo creado exitosamente.",
      id: post.id,
    });
  } catch (error) {
    console.error("Blog POST error:", error);
    return NextResponse.json(
      { success: false, error: "Error al crear el artículo." },
      { status: 500 }
    );
  }
}
