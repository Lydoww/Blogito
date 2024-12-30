"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-white">Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="flex text-3xl font-bold mb-6 text-white justify-center">
        Recent Posts
      </h1>
      <ul className="space-y-4 flex flex-row space-x-10">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="bg-white p-4 rounded hover:scale-105 transition ease-in-out"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-black">{post.title}</h2>
              <p className="text-gray-600">
                {post.content || "No content available"}
              </p>
              <p className="text-gray-800 mt-2 text-sm">
                By {post.author?.name || post.author?.username || "Unknown"} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
