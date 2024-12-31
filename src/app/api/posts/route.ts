import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createPost } from "@/actions/posts";
import { z } from "zod";
import { db } from "@/lib/db";
import { generateUniqueSlug } from "@/utils/slug"; // Importez la fonction de génération de slug

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().max(5000, "Content is too long").optional(),
});

// find all the posts

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// find a single post 




// create a new post
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error("Unauthorized: No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Request body received:", body);

    const parsedData = postSchema.safeParse(body);

    if (!parsedData.success) {
      console.error("Validation failed:", parsedData.error.flatten());
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { title, content } = parsedData.data;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!session.user.id) {
      console.error("Invalid session:", session);
      return NextResponse.json(
        { error: "Author ID is missing" },
        { status: 400 }
      );
    }

    // Générer un slug unique basé sur le titre
    const slug = await generateUniqueSlug(title);

    // Créer le post avec le slug
    const post = await createPost({
      title,
      content,
      slug,
      authorId: session.user.id,
    });

    console.log("Post created successfully:", post);

    // Réponse avec un indicateur de succès et l'URL de redirection
    return NextResponse.json(
      { success: true, redirect: `/posts/${slug}` }, // Redirige vers le post créé
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
