import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Registrar visita
    await prisma.visita.create({ data: {} });

    // Buscar todas as visitas
    const visitas = await prisma.visita.findMany({
      orderBy: { dataHora: "desc" },
    });

    return NextResponse.json({
      total: visitas.length,
      visitas: visitas.map(v => ({ id: v.id, dataHora: v.dataHora })),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erro ao buscar visitas" }, { status: 500 });
  }
}