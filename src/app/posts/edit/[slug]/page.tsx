// app/posts/edit/[slug]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Importation de useParams

const EditPostPage: React.FC = () => {
  const { slug } = useParams(); // Récupération du paramètre slug
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Slug is missing");
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post data");
      }
    };

    fetchPost();
  }, [slug]);

  const handleSave = async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      router.push(`/posts`);
    } catch (error: any) {
      console.error("Error updating post:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-52">
      <h1 className="flex text-2xl font-bold mb-4 text-white justify-center">Edit Post</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2 text-white">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium mb-2 text-white">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2"
          rows={6}
        ></textarea>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditPostPage;
