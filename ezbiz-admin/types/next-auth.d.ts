import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    pageLimit: number;
  }
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
      pageLimit: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;

    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
      pageLimit: number;
    } & DefaultSession["user"];
  }
}
