import { db } from "@/lib/db";
import { CreatePostInput } from "@/types/posts";
import { generateUniqueSlug  } from "@/utils/slug";


export async function getPosts(page: number = 1, pageSize: number = 10) {
  return await db.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function publishPost(id: number, published: boolean) {
  return await db.post.update({
    where: { id },
    data: { published },
  });
}

export async function getPostWithAuthor(id: any) {
  return await db.post.findUnique({
    where: { id },
    include: { author: true },
  });
}

export async function createPost(input: CreatePostInput) {
  console.log("CreatePostInput received:", input);

  const { title, content, authorId } = input;

  if (!title || !authorId) {
    throw new Error("Title and authorId are required");
  }

  const slug = await generateUniqueSlug(title);

  console.log("Data to be saved:", { title, content, slug, authorId });

  return await db.post.create({
    data: {
      title,
      content: content || null,
      slug,
      authorId,
    },
  });
}

export async function updatePost(id: any, data: any) {
  const post = await db.post.update({ where: { id }, data });
  return post;
}

export async function deletePost(id: any) {
  await db.post.delete({ where: { id } });
}

async function main() {
  const posts = await getPosts();
  console.log("Posts:", posts);

  // const post = await getPostWithAuthor("cm55nmkte0003w4sggjlj0f4j");
  // console.log("Post:", post);
}

main();
