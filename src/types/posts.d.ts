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
};
