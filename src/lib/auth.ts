import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: `${existingUser.id}`, // Inclure l'ID utilisateur
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Token:", token, "User:", user);

      // Inclure `user.id` dans le token JWT lorsqu'un utilisateur est connecté
      if (user) {
        return {
          ...token,
          id: user.id, // Ajouter l'ID utilisateur
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token:", token);

      // Ajouter `token.id` dans `session.user.id`
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id, // Inclure l'ID utilisateur dans la session
          username: token.username,
        },
      };
    },
  },
};
