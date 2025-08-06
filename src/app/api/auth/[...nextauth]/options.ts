import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase-admin";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .or(`google_id.eq.${user.id},email.eq.${user.email}`)
            .single();

          if (!existingUser) {
            const { data: newUser, error } = await supabase
              .from("users")
              .insert([
                {
                  username: user.name,
                  email: user.email,
                  provider: "google",
                  google_id: user.id,
                  password: null,
                },
              ])
              .select("id")
              .single();

            if (error) {
              console.error("Error creating Google user:", error);
              return false;
            }
            user.id = newUser.id.toString();
          } else {
            user.id = existingUser.id.toString();
          }
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};
