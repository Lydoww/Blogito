import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Fonction utilitaire pour extraire les paramètres dynamiques
function getParams(req: Request) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop(); // Extrait le slug depuis l'URL
  return slug;
}

// Gestion de la requête GET
export async function GET(req: Request) {
  const slug = getParams(req);

  if (!slug) {
    return NextResponse.json(
      { error: "Slug is missing" },
      { status: 400 }
    );
  }

  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// Gestion de la requête DELETE
export async function DELETE(req: Request) {
  const slug = getParams(req);

  if (!slug) {
    return NextResponse.json(
      { error: "Slug is missing" },
      { status: 400 }
    );
  }

  try {
    const post = await db.post.delete({ where: { slug } });

    return NextResponse.json(
      { message: "Post deleted successfully", post },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
