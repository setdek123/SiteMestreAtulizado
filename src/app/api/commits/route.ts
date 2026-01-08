// app/api/commits/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET público: retorna todos os commits
export async function GET() {
  try {
    const commits = await prisma.commit.findMany({
      orderBy: { createdAt: "desc" }, // mais recente primeiro
    });

    return NextResponse.json(commits, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar commits:", err);
    return NextResponse.json(
      { msg: "Erro ao carregar comentários" },
      { status: 500 }
    );
  }
}

// POST público: cria um commit
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { msg: "Mensagem obrigatória!" },
        { status: 400 }
      );
    }

    const commit = await prisma.commit.create({
      data: { message },
    });

    return NextResponse.json(commit, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar commit:", err);
    return NextResponse.json({ msg: "Erro interno" }, { status: 500 });
  }
}