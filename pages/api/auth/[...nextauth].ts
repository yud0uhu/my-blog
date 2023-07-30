import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NEXT_PUBLIC_SECRET } =
//   process.env;

const GITHUB_CLIENT_ID = "4a77e0d2424aa3e623e0";
const GITHUB_CLIENT_SECRET = "07eb52efcd3e87f5dfa47d5d8e5e61f4158e8c4a";
const NEXT_PUBLIC_SECRET = "4bRXpaP8Vi01ldHky/F1XW7QyXkYtBKcAil2tVBaZg0=";

if (!GITHUB_CLIENT_ID) throw new Error("You must provide GITHUB_ID env var.");
if (!GITHUB_CLIENT_SECRET)
  throw new Error("You must provide GITHUB_SECRET env var.");
if (!NEXT_PUBLIC_SECRET)
  throw new Error("You must provide NEXT_PUBLIC_SECRET env var.");

export const authOptions: NextAuthOptions = {
  secret: NEXT_PUBLIC_SECRET,
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID || "",
      clientSecret: GITHUB_CLIENT_SECRET || "",
    }),
  ],
  // セッション保存先
  session: { strategy: "jwt" },
  pages: {
    signIn: "/api/auth/signin",
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
