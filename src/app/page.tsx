import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
// import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="text-2xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Go to your admin page.
      </Link>
      {/* <User /> */}
    </div>
  );
}
