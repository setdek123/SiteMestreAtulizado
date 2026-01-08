// app/middleware.ts
import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import jwt from "jsonwebtoken";

// Rotas públicas
const publicRoutes = [
  { path: "/", whenAuthenticated: "next" },        // ✅ raiz é pública
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/home", whenAuthenticated: "next" },
  { path: "/pricing", whenAuthenticated: "next" },
]as const;

// Rota para redirecionar usuários não autenticados
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

// Chave secreta do JWT
const JWT_SECRET = process.env.SECRET_TOKEN || "secret";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 🔹 Ignorar rotas de API, _next e arquivos estáticos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|txt|xml)$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // Verifica se a rota é pública
  const publicRoute = publicRoutes.find((r) => r.path === pathname);

  // 🔓 Usuário não logado tentando acessar rota pública
  if (!token && publicRoute) return NextResponse.next();

  // 🔒 Usuário não logado tentando acessar rota privada
  if (!token && !publicRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
    );
  }

  // Usuário logado
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error("JWT inválido:", err);
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
      );
    }

    // Usuário logado tentando acessar página pública com redirect
    if (publicRoute?.whenAuthenticated === "redirect") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Usuário logado acessando rota privada ou rota pública sem redirect → deixa passar
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!favicon.ico|robots.txt|sitemap.xml|img|images|fonts|videos).*)",
  ],
};