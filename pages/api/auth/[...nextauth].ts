import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NEXT_PUBLIC_SECRET } =
  process.env;

if (!GITHUB_CLIENT_ID) throw new Error("You must provide GITHUB_ID env var.");
if (!GITHUB_CLIENT_SECRET)
  throw new Error("You must provide GITHUB_SECRET env var.");
if (!NEXT_PUBLIC_SECRET)
  throw new Error("You must provide NEXT_PUBLIC_SECRET env var.");

export const authOptions: NextAuthOptions = {
  secret: "4bRXpaP8Vi01ldHky/F1XW7QyXkYtBKcAil2tVBaZg0=",
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID || "",
      clientSecret: GITHUB_CLIENT_SECRET || "",
    }),
  ],
  // セッション保存先
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     session.user.accessToken = token.accessToken;
  //     return session;
  //   },
  //   async jwt({ token, account }) {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  // },
};

export default NextAuth(authOptions);
