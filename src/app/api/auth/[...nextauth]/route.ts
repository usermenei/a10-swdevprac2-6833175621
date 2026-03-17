import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";

const handler = typeof NextAuth === "function" ? NextAuth(authOptions) : (authOptions as any);

export { handler as GET, handler as POST };
