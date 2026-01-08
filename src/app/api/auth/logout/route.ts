import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ msg: "Logout realizado com sucesso!" });

    // Apaga o cookie "token"
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0, // expira imediatamente
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Erro ao fazer logout:", err);
    return NextResponse.json({ msg: "Erro ao fazer logout" }, { status: 500 });
  }
}