"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // useSession() works because Banner is wrapped in NextAuthProvider in layout.tsx
  const { data: session } = useSession();

  return (
    <div
      className="block p-[5px] m-0 w-screen h-[80vh] relative cursor-pointer"
      onClick={() => setIndex(index + 1)}
    >
      <Image
        src={covers[index % covers.length]}
        alt="cover"
        fill
        priority
        className="object-cover"
      />

      {/* Text overlay */}
      <div className="absolute top-[400px] left-0 right-0 z-20 text-center text-white drop-shadow-lg">
        <h1 className="text-4xl font-medium">where every event finds its venue</h1>
        <h3 className="text-xl font-serif">
          Find Your Space, Create Your Story. From weddings to workshops, we
          have the perfect spot for you.
        </h3>
      </div>

      {/*
        Welcome message — shown at TOP-RIGHT when user is logged in.
        Assignment requirement: "Welcome <name>" e.g. "Welcome Alice"
      */}
      {session ? (
        <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl drop-shadow">
          Welcome {session.user?.name}
        </div>
      ) : null}

      {/* Select Venue button — bottom-right */}
      <button
        className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-4 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // prevent cycling the banner image
          router.push("/venue");
        }}
      >
        Select Venue
      </button>
    </div>
  );
}