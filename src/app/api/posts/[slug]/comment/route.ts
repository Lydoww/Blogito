// app/api/posts/[slug]/comment/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1, "Content is required").max(1000, "Content is too long"),
});

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const session = await getServerSession(authOptions);

  if (!slug) {
    return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
  }

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsedData = commentSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { content } = parsedData.data;

    const post = await db.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Ajouter un commentaire
    const comment = await db.comment.create({
      data: {
        content,
        postId: post.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}