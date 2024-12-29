"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const data = await res.json();
      console.log("Post created successfully:", data); // Log de la réponse
      setTitle("");
      setContent("");
      setSuccess(true);

      if(data.redirect){
        router.push(data.redirect);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium text-white">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block font-medium text-white">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-2 py-1"
          rows={4}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Post created successfully!</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePostForm;
