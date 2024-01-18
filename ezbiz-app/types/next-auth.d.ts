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

// id: z.number().int().positive(),
// first_name: z.string().min(1).max(255),
// last_name: z.string().min(1).max(255),
// email: z.string().email().min(1).max(255),
// password: z.string().min(1).max(255),
// role: z.string().min(1).max(255),
// is_active: z.boolean(),
