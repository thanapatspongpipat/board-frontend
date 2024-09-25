import NextAuth from "next-auth/next";

declare module "next-auth" {
     interface Session {
          user: {
               id: number;
               email: string;
          };
          backendTokens: {
               accessToken: string;
          };
     }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
     interface JWT {
          user: {
               id: number;
               email: string;
          };
          backendTokens: {
               accessToken: string;
          };
     }
}
