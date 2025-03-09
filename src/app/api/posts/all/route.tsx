import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Récupérer tous les articles avec les informations de l'auteur, les vues et les commentaires
    const posts = await db.post.findMany({
      include: {
        author: true, // Inclure les informations de l'auteur
        views: true, // Inclure les vues
        comments: {
          include: {
            user: true, // Inclure l'utilisateur qui a posté le commentaire
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Trier par date de création
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
