import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: "4bRXpaP8Vi01ldHky/F1XW7QyXkYtBKcAil2tVBaZg0=",
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
