import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// console.log(process.env.GITHUB_ID);
// if (!process.env.GITHUB_ID)
//   throw new Error("You must provide GITHUB_ID env var.");
// if (!process.env.GITHUB_SECRET)
//   throw new Error("You must provide GITHUB_SECRET env var.");
// if (!process.env.NEXT_PUBLIC_SECRET)
//   throw new Error("You must provide NEXT_PUBLIC_SECRET env var.");

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET || "",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
