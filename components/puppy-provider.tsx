"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { initialData, isPuppyData, today, type PuppyData } from "@/lib/puppy";

const Context = createContext<{
  data: PuppyData;
  setData: Dispatch<SetStateAction<PuppyData>>;
  ready: boolean;
  message: string;
  announce: (message: string) => void;
} | null>(null);
const STORAGE_KEY = "puppy.care.v1";

export function PuppyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(initialData);
  const [ready, setReady] = useState(false);
  const [message, announce] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        let parsed: unknown;
        try {
          parsed = JSON.parse(saved);
        } catch {
          announce(
            "Los datos guardados no se pudieron recuperar. Cargamos el ejemplo de Puppy.",
          );
        }
        if (isPuppyData(parsed))
          setData({
            ...parsed,
            completed: parsed.routineDay === today() ? parsed.completed : [],
            routineDay: today(),
          });
        else
          announce(
            "Los datos guardados no se pudieron recuperar. Cargamos el ejemplo de Puppy.",
          );
      }
    } catch {
      announce(
        "El almacenamiento no está disponible. Los cambios durarán mientras tengas esta página abierta.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      announce(
        "No pudimos guardar en este navegador. Tus cambios siguen disponibles en esta sesión.",
      );
    }
  }, [data, ready]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => announce(""), 6500);
    return () => clearTimeout(timer);
  }, [message]);
  useEffect(() => {
    const refresh = () =>
      setData((prev) =>
        prev.routineDay === today()
          ? prev
          : { ...prev, routineDay: today(), completed: [] },
      );
    const timer = setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  return (
    <Context.Provider value={{ data, setData, ready, message, announce }}>
      {children}
    </Context.Provider>
  );
}

export function usePuppy() {
  const value = useContext(Context);
  if (!value) throw new Error("PuppyProvider is required");
  return value;
}
