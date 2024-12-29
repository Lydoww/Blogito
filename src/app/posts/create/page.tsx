import CreatePostForm from "@/components/form/CreatePostForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login"); // Redirige si non connecté
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Create a New Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
