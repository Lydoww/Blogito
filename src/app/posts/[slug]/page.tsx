import { db } from "@/lib/db";

interface PostDetailsProps {
  params: { slug: string };
}

const PostDetails = async ({ params }: PostDetailsProps) => {
  // Attendez les paramètres correctement
  const slug = params?.slug;

  if (!slug) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-red-500 text-2xl">Error</h1>
        <p>Invalid or missing slug.</p>
      </div>
    );
  }

  try {
    // Récupérez les détails du post depuis la base de données
    const post = await db.post.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!post) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-red-500 text-2xl">404 - Post Not Found</h1>
          <p>The post you are looking for does not exist.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
        <p className="text-sm text-gray-500">
          By {post.author?.name || "Unknown"} on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-red-500 text-2xl">Error</h1>
        <p>Failed to fetch post details.</p>
      </div>
    );
  }
};

export default PostDetails;
