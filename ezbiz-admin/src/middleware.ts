export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/pages/:path*", "/socials/:path*", "/users/:path*"],
};
