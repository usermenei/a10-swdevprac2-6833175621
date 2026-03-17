import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-200 flex items-center px-4">

      {/* FAR LEFT: Sign-In / Sign-Out */}
      {session ? (
        <Link href="/api/auth/signout" className="text-cyan-600 text-sm hover:text-cyan-800 whitespace-nowrap">
          Sign-Out of {session.user?.name}
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="text-cyan-600 text-sm hover:text-cyan-800">
          Sign-In
        </Link>
      )}

      {/* My Booking — with gap from Sign-In */}
      <Link href="/mybooking" className="text-cyan-600 text-sm hover:text-cyan-800 ml-6">
        My Booking
      </Link>

      <div className="flex-1" />

      {/* FAR RIGHT: Booking + Logo */}
      <TopMenuItem title="Booking" pageRef="/booking" />
      <Image
        src="/img/logo.png"
        alt="logo"
        width={40}
        height={40}
        className="ml-2 object-contain"
      />
    </div>
  );
}