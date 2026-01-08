// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, passw } = await req.json();

    if (!name || !email || !passw) {
      return new NextResponse(JSON.stringify({ msg: "Todos os campos são obrigatórios!" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ msg: "E-mail já cadastrado!" }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const hashPassw = await bcrypt.hash(passw, 10);

    const user = await prisma.user.create({
      data: { name, email, passw: hashPassw },
    });

    console.log("Usuário criado:", user);

    return new NextResponse(JSON.stringify({ msg: "Usuário criado com sucesso!" }), { status: 201, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Erro no registro:", err);
    return new NextResponse(JSON.stringify({ msg: "Erro interno ao criar usuário" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}