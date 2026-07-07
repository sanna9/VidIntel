export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/upload"], //  protected routes here later, e.g. "/upload/:path*"
};