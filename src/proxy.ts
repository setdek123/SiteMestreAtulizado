import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/home", whenAuthenticated: "next" },
  { path: "/pricing", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";
const JWT_SECRET = process.env.SECRET_TOKEN || "secret";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignorar Next, API e arquivos estáticos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|txt|xml|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // 🔑 Match de rota pública correto
  const publicRoute = publicRoutes.find(
    (r) => pathname === r.path || pathname.startsWith(r.path + "/")
  );

  // 🔓 Não logado em rota pública
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // 🔒 Não logado em rota privada
  if (!token && !publicRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
    );
  }

  // 🔐 Usuário logado
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
      );
    }

    // Logado tentando acessar sign-in ou register
    if (publicRoute?.whenAuthenticated === "redirect") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!favicon.ico|robots.txt|sitemap.xml|img|images|fonts|videos).*)",
  ],
};
