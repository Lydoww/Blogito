import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PostsAndNews from "@/components/PostAndNews";
import { redirect } from "next/navigation";

// Récupération de la session côté serveur dans le composant
export default async function Home() {
  const session = await getServerSession(authOptions);

  // Si pas de session, redirige vers la page de connexion
  if (!session) {
    return redirect("/landing");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">
        Welcome back,
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {" "}
          {session?.user.username || session?.user.name}
        </span>
      </h1>
      <PostsAndNews user={session.user} />{" "}
    </div>
  );
}
