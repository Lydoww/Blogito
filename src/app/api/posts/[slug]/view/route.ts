// app/api/posts/[slug]/view/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const session = await getServerSession(authOptions);

  if (!slug) {
    return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
  }

  try {
    const post = await db.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Enregistrer une vue
    await db.view.create({
      data: {
        postId: post.id,
        userId: session?.user?.id || null, // userId est optionnel (peut être null pour les vues anonymes)
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}