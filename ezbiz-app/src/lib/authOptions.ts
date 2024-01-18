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
      async authorize(credentials, req) {
        console.log(credentials);
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
        // console.log(credentials);
        // const user = {
        //   id: "1",
        //   name: "J Smith",
        //   email: "kokweikhong@gmail.com",
        //   firstName: "Kok Wei",
        //   lastName: "Khong",
        //   role: "admin",
        //   isActive: true,
        // };
        // return user;
      },
    }),
  ],
  jwt: {
    // 7 days
    maxAge: 7 * 24 * 60 * 60,
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
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
