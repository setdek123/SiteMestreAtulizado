import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, passw } = await req.json();

    if (!email || !passw) {
      return NextResponse.json({ msg: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ msg: "Usuário não encontrado" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(passw, user.passw);
    if (!isValid) {
      return NextResponse.json({ msg: "Senha inválida" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_TOKEN || "secret",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ msg: "Login realizado com sucesso!" }, { status: 200 });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      sameSite: "lax",
    });

    return response;

  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.json({ msg: "Erro interno no login" }, { status: 500 });
  }
}