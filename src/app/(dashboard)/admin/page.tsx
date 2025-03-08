import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="flex flex-col items-center h-screen mt-10">
        <h2 className="text-2xl text-white">
          Admin page - Welcome back{" "}
          {session?.user.username || session?.user.name}
        </h2>
        <div className="mt-6 flex gap-4">
          <Link
            href="/posts/create"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create a new post
          </Link>
          <Link
            href="/posts"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            View your posts
          </Link>
        </div>
      </div>
    );
  }

  return <h2 className="text-2xl">Please login to see your admin page</h2>;
};

export default AdminPage;
