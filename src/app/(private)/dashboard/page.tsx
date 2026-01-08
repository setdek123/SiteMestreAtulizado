'use client';

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";

interface Commit {
  id: string;
  message: string;
}

interface Visita {
  id: string;
  dataHora: string;
}

export default function Dashboard() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [statistics, setStatistics] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ================= AUTH CHECK =================
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/commits", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/sign-in"); // usuário não autenticado
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/sign-in");
      }
    }

    checkAuth();
  }, [router]);

  // ================= FETCH COMMITS =================
  useEffect(() => {
    if (loading) return;

    async function fetchCommits() {
      try {
        const res = await fetch("/api/commits", {
          credentials: "include",
        });

        if (res.status === 401) {
          logout();
          return;
        }

        if (!res.ok) throw new Error("Erro ao buscar comentários");

        const data: Commit[] = await res.json();
        setCommits(data);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar comentários.");
      }
    }

    fetchCommits();
  }, [loading]);

  // ================= FETCH VISITAS =================
  useEffect(() => {
    if (loading) return;

    async function fetchVisitas() {
      try {
        const res = await fetch("/api/visitas", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar visitas");

        const data = await res.json();
        setVisitas(data.visitas || []);
        setStatistics({ total: data.total || 0 });
      } catch (err) {
        console.error(err);
      }
    }

    fetchVisitas();
  }, [loading]);

  // ================= DELETE COMMIT =================
  async function deleteCommit(id: string) {
    try {
      const res = await fetch(`/api/commits/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        logout();
        return;
      }

      if (!res.ok) throw new Error();

      setCommits(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar comentário.");
    }
  }

  // ================= LOGOUT =================
  function logout() {
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .finally(() => {
        router.push("/sign-in");
      });
  }

  // ================= TOTAL VISITAS =================
  const totalVisitas = Object.values(statistics).reduce(
    (acc, value) => acc + Number(value || 0),
    0
  );

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Carregando painel...
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700">
          Painel do Administrador
        </h1>

        <MdLogout
          onClick={logout}
          className="w-10 h-10 text-gray-600 cursor-pointer hover:text-red-500"
        />
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="flex flex-col md:flex-row gap-10">
        {/* COMMITS */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold text-gray-600 mb-4">
            Comentários do Site
          </h2>

          {commits.length > 0 ? (
            <ul className="space-y-2 border border-gray-300 p-3 max-h-[500px] overflow-auto">
              {commits.map(item => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-3 flex justify-between items-center rounded-md border"
                >
                  <p>{item.message}</p>
                  <FaTrash
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteCommit(item.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-10 text-center">
              Ainda não há comentários.
            </p>
          )}
        </div>

        {/* VISITAS */}
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-5xl font-extrabold mb-5">
            Total de visitas
          </span>

          <span
            className={`text-7xl font-extrabold ${
              totalVisitas >= 100
                ? "text-green-500"
                : totalVisitas <= 10
                ? "text-red-500"
                : "text-gray-700"
            }`}
          >
            {totalVisitas}
          </span>

          {/* Lista detalhada das visitas */}
          <div className="mt-10 w-full max-h-[300px] overflow-auto border border-gray-300 p-3">
            {visitas.length > 0 ? (
              <ul className="space-y-2">
                {visitas.map(v => (
                  <li key={v.id} className="p-2 bg-gray-100 rounded-md">
                    {new Date(v.dataHora).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">Nenhuma visita registrada ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}