import { signIn } from "@/services/auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await signIn({
          email: credentials.email,
          password: credentials.password,
        });

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  jwt: {
    // 7 days
    maxAge: 7 * 24 * 60 * 60,
  },
  // session: {
  //   maxAge: 7 * 24 * 60 * 60,
  // },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log("expires", account?.expires_at);
      // console.log("user", user);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log(user);

      // @ts-ignore
      session.user = token;

      console.log(session);
      // session.user.name = user.name;

      return session;
    },
  },
};
