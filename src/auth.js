import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserByEmail } from "./data/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = getUserByEmail(credentials?.email);
          console.log(user);
          if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
              console.log(`auth: isMatch: ${isMatch}`);
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the token
      if (user) {
        token.username = user.username;
      }
      console.log(`token: ${JSON.stringify(token)}`);
      return token;
    },
    async session({ session, token }) {
      // Add token information to the session
      session.user.username = token.username;

      //console.log(`session.user: ${JSON.stringify(session.user)}`);

      return session;
    },
  },
});
