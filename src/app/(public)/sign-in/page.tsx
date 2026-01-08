'use client';

import { FormEvent, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [login, setLogin] = useState('');
  const [passw, setPassw] = useState('');
  const [loginErrorM, setLoginErrorM] = useState(false);
  const [passwErrorM, setPasswErrorM] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let hasError = false;

    if (!login.trim()) {
      setLoginErrorM(true);
      hasError = true;
    } else {
      setLoginErrorM(false);
    }

    if (!passw.trim()) {
      setPasswErrorM(true);
      hasError = true;
    } else {
      setPasswErrorM(false);
    }

    if (hasError) return;

    try {
      setLoading(true);
      setMsgError('');

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login,
          passw,
        }),
        credentials: 'include', // 🔥 ESSENCIAL
      });

      const data = await res.json();

      if (!res.ok) {
        setMsgError(data.msg || 'E-mail ou senha inválidos!');
        return;
      }

      window.location.href='/dashboard';
    } catch (error) {
      console.error(error);
      setMsgError('Erro ao tentar logar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white shadow-2xl rounded-2xl p-10 w-[360px]"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-700">
          Login Admin
        </h1>

        {/* EMAIL */}
        <div className="flex gap-3 items-center">
          <FaUser size={20} className="text-gray-500" />
          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="E-mail"
              className={`p-3 rounded border ${
                loginErrorM ? 'border-red-500' : 'border-gray-400'
              } focus:outline-none`}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            {loginErrorM && (
              <span className="text-sm text-red-500">
                Preencha o campo e-mail
              </span>
            )}
          </div>
        </div>

        {/* SENHA */}
        <div className="flex gap-3 items-center">
          <FaLock size={20} className="text-gray-500" />
          <div className="flex flex-col w-full">
            <input
              type="password"
              placeholder="Senha"
              className={`p-3 rounded border ${
                passwErrorM ? 'border-red-500' : 'border-gray-400'
              } focus:outline-none`}
              value={passw}
              onChange={(e) => setPassw(e.target.value)}
            />
            {passwErrorM && (
              <span className="text-sm text-red-500">
                Preencha o campo senha
              </span>
            )}
          </div>
        </div>

        {/* ERRO */}
        {msgError && (
          <p className="text-red-600 text-center font-semibold">{msgError}</p>
        )}

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition disabled:opacity-50"
        >
          {loading ? 'Logando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}