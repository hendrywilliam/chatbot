import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/chat-pdf", "/sign-up", "/sign-in"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
