import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "42",
          name: "vignesh",
          password: "nextjstask",
          role: "admin",
        };
        // const admin = {
        //   id: "41",
        //   name: "Admin",
        //   password: "nextjstask",
        //   type: "Admin",
        // };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        return session;
      }
    },
  },
};
