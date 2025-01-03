import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

interface PostDetailsProps {
  params: { slug: string };
}

const PostDetails = async ({ params }: PostDetailsProps) => {
  const { slug } = params;

  const session = await getServerSession(authOptions);

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

  const isAuthor = session?.user?.id === post.authorId;

  return (
    <div className="container mx-auto p-8 bg-gray-200 rounded-lg max-w-4xl mt-52">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-black mb-6">
        <span>
          By {post.author?.name || post.author?.username} | Published{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="prose prose-invert lg:prose-xl text-black leading-8">
        {post.content}
      </div>
      {isAuthor && (
        <div className="mt-6 flex space-x-3">
          <Link href={`/posts/edit/${slug}`} className="btn btn-primary">
            Edit
          </Link>
          <DeleteButton slug={slug} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
