import { db } from "@/lib/db";

// Générer un slug à partir d'un titre
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères non-alphanumériques par des tirets
    .replace(/^-+|-+$/g, ""); // Supprime les tirets au début/à la fin
}

// Générer un slug unique
export async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;
  let counter = 1;

  while (await db.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
