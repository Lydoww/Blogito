// src/types/posts.d.ts

export type PostType = {
  id: number;
  title: string;
  slug: string;
  content?: string;
  imageUrl?: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: { name: string; username: string };
  views?: { id: string; createdAt: string }[]; // Ajout des vues
  comments?: {
    id: string;
    content: string;
    createdAt: string;
    user: { name: string; username: string };
  }[]; // Ajout des commentaires
  CreatePostInput: { title: string; content?: string; authorId: string };
};
