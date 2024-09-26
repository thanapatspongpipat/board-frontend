import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { BACKEND_URL } from "@/lib/basePath";

const authOptions: NextAuthOptions = {
     providers: [
          CredentialsProvider({
               name: "Credentials",
               credentials: {
                    email: {
                         label: "Username",
                         type: "email",
                         placeholder: "examplet@email.com",
                    },
               },
               async authorize(credentials, req: any) {
                    if (!credentials?.email) {
                         return null;
                    }
                    const { email } = credentials;
                    const res = await fetch(BACKEND_URL + "/auth/login", {
                         method: "POST",
                         body: JSON.stringify({
                              email,
                         }),
                         headers: {
                              "Content-Type": "application/json",
                         },
                    });
                    if (res.status == 401) {
                         console.log(res.statusText);
                         return null;
                    }
                    const user = await res.json();
                    return user;
               },
          }),
     ],
     pages: {
          signIn: "/",
     },
     secret: process.env.NEXTAUTH_SECRET,
     callbacks: {
          async jwt({ token, user }) {
               if (user) return { ...token, ...user };
               return token;
          },
          async session({ token, session }) {
               session.user = token.user;
               session.backendTokens = token.backendTokens;
               console.log("Session", session);
               return session;
          },
     },
};

export const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
