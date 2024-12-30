import { db } from "@/lib/db";

interface PostDetailsProps {
  params: Promise<{ slug: string }>;
}

const PostDetails = async (props: PostDetailsProps) => {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-red-500 text-4xl font-bold">Error</h1>
        <p className="text-lg text-gray-400 mt-2">
          Invalid or missing slug. Please try again.
        </p>
      </div>
    );
  }

  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!post) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-red-500 text-4xl font-bold">
            404 - Post Not Found
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            The post you are looking for does not exist or has been removed.
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-8 max-w-4xl bg-gray-200 rounded-lg">
        {/* Post Title */}
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 text-sm text-black mb-6">
          <div className="flex items-center">
            <span className="font-semibold">By</span>{" "}
            <span className="ml-1">
              {post.author?.name || post.author?.username}
            </span>
          </div>
          <div>|</div>
          <div>
            <span className="font-semibold">Published</span>{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-invert lg:prose-xl text-black leading-8">
          {post.content}
        </div>

        {/* Comments Section */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-bold text-black mb-4">Comments</h2>
          <p className="text-black">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-red-500 text-4xl font-bold">Error</h1>
        <p className="text-lg text-gray-400 mt-2">
          Failed to fetch post details. Please try again later.
        </p>
      </div>
    );
  }
};

export default PostDetails;
