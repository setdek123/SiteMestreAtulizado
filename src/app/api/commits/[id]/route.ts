// src/app/api/commits/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    // ================= COOKIE =================
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // ================= JWT =================
    try {
      jwt.verify(token, process.env.SECRET_TOKEN as string);
    } catch {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // ================= PARAM =================
    const { id } = await context.params; // ⚡ await aqui
    if (!id || id.length !== 24) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // ================= BANCO =================
    await prisma.commit.delete({
      where: { id }, // MongoDB ObjectId como string
    });

    return NextResponse.json(
      { message: "Comentário deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar commit:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}