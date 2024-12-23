import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  console.log(buttonVariants());
  return (
    <div>
      <h1 className="text-2xl">Home</h1><Link className={buttonVariants()} href="/admin">Go to your admin page.</Link>
    </div>
  );
}
