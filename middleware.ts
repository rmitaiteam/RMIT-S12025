import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server.utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { cookies } from "next/headers";
import { decodeJWT } from "aws-amplify/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const cookieStore = cookies();
  let idToken: string | undefined;
  cookieStore.getAll().forEach(cookie => {
    if (cookie.name.includes('.idToken')) {
      idToken = cookie.value;
    }
  });

  let decodedToken;
  if (idToken) {
    decodedToken = decodeJWT(idToken);
  }

  const publicRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  const privateRoutes = ["/dashboard", "/recents", "/analytics", "/generate", "/keywords"];
  const adminRoutes = ["/admin"];

  const user_group = decodedToken?.payload["cognito:groups"] as string[] | undefined;

  if (user && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user && privateRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user && adminRoutes.includes(request.nextUrl.pathname) && (!Array.isArray(user_group) || !user_group.includes("Admin"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
