"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  slug: string;
}

const EditButton: React.FC<EditButtonProps> = ({ slug }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Envoi de la requête PUT vers : ", `/api/posts/${slug}`);
      console.log("Données envoyées : ", { title, content });
      const response = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }), // Données utilisateur
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      // Redirection après la mise à jour réussie
      router.push("/posts");
    } catch (error: any) {
      console.error("Error updating post:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Enter new title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 w-full"
      />

      <textarea
        placeholder="Enter new content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border px-2 py-1 w-full"
        rows={4}
      />

      <button
        className={`btn btn-primary ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleEdit}
        disabled={loading || !title.trim() || !content.trim()}
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditButton;
