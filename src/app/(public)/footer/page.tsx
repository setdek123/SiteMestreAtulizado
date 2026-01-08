'use client';

import { useState, useEffect, FormEvent, useCallback } from "react";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";

interface Commit {
  id: string;
  message: string;
  createdAt: string;
}

const Footer = () => {
  const [msgVisitor, setMsgVisitor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [ItemsUsers, setItemsUsers] = useState<Commit[]>([]);

  // Buscar comentários
  const initCommits = useCallback(async () => {
    try {
      const res = await fetch("/api/commits");
      if (!res.ok) throw new Error(`Erro ao buscar comentários: ${res.status}`);

      const data: Commit[] = await res.json();
      setItemsUsers(
        data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      setErrorMsg("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao carregar comentários.");
    }
  }, []);

  useEffect(() => {
    initCommits();
  }, [initCommits]);

  // Enviar comentário
  const commitUsers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msgVisitor.trim()) {
      setErrorMsg("Digite uma mensagem antes de enviar!");
      return;
    }

    try {
      const res = await fetch("/api/commits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgVisitor }),
      });

      if (!res.ok) throw new Error(`Erro ao enviar comentário: ${res.status}`);

      setMsgVisitor("");
      setErrorMsg("");
      await initCommits();
    } catch (err) {
      console.error(err);
      setErrorMsg("Falha ao enviar comentário.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-10 items-center bg-[#081020]">
      <h1 className="text-3xl md:text-7xl font-extrabold text-green-500 text-center mb-10">
        Deixe sua opinião sobre nosso site!
      </h1>

      <form onSubmit={commitUsers} className="flex gap-5 flex-wrap justify-center mb-10">
        <input
          type="text"
          className="bg-amber-50 p-3 px-5 w-80 rounded-md md:w-[600px]"
          value={msgVisitor}
          onChange={(e) => setMsgVisitor(e.target.value)}
          placeholder="Insira seu comentário..."
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold px-6 rounded-md hover:bg-green-600 transition"
        >
          Enviar
        </button>
      </form>

      {errorMsg && <p className="text-red-400 text-xl mb-10">{errorMsg}</p>}

      <ul className="flex flex-col gap-6 w-full max-w-3xl">
        {ItemsUsers.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-5 bg-[#111a2e] p-4 rounded-md border border-gray-700"
          >
            <FaUserCircle size={35} className="text-white" />
            <div>
              <p className="text-white font-bold">Visitante</p>
              <span className="text-gray-400">{item.message}</span>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="https://api.whatsapp.com/send/?phone=5521964933158&text=Olá!+Gostaria+de+saber+mais+sobre+aulas+de+capoeira."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5"
      >
        <FaWhatsapp size={70} className="text-green-500 hover:scale-110 transition" />
      </a>
    </div>
  );
};

export default Footer;