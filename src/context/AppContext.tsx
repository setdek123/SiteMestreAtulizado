'use client';

import {
  createContext,
  useState,
  useContext,
  FormEvent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// ================= TIPOS =================
export interface Commit {
  id: number;
  message: string;
}

interface AppContextType {
  msgVisitor: string;
  setMsgVisitor: Dispatch<SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  ItemsUsers: Commit[];
  setItemsUsers: Dispatch<SetStateAction<Commit[]>>;
  CommitUsers: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

// ================= CONTEXT =================
const AppContext = createContext<AppContextType | null>(null);

// ================= PROVIDER =================
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [msgVisitor, setMsgVisitor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [ItemsUsers, setItemsUsers] = useState<Commit[]>([]);

  // ================= ENVIAR COMENTÁRIO =================
  const CommitUsers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!msgVisitor.trim()) {
      setErrorMsg("Digite um comentário.");
      return;
    }

    try {
      const res = await fetch("/api/commits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgVisitor }),
      });

      if (!res.ok) throw new Error();

      setMsgVisitor("");
      setErrorMsg("");
    } catch {
      setErrorMsg("Erro ao enviar comentário.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        msgVisitor,
        setMsgVisitor,
        errorMsg,
        setErrorMsg,
        ItemsUsers,
        setItemsUsers,
        CommitUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ================= HOOK =================
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de <AppProvider>");
  }
  return context;
};