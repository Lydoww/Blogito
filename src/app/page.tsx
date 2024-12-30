import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/landing");
  }

  return (
    <div>
      <h1 className="text-2xl text-white">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Go to your admin page.
      </Link>
      {/* <User /> */}
    </div>
  );
}
