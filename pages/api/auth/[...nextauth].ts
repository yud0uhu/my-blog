import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: "4bRXpaP8Vi01ldHky/F1XW7QyXkYtBKcAil2tVBaZg0=",
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "4a77e0d2424aa3e623e0",
      clientSecret: "c15befdd5cfdda48a9cf24f82ce70876ed9622ac",
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
