"use client";
import { useState, useEffect } from "react";
import type { Rol } from "./roller";

export interface KullaniciBilgisi {
  id: string;
  eposta: string;
  adSoyad: string;
  rol: Rol;
  accessToken: string;
}

export interface AuthState {
  kullanici: KullaniciBilgisi | null;
  yukleniyor: boolean;
}

const STORAGE_KEY = "ogm-kullanici";

/** localStorage'dan kullanıcı bilgisini okur */
export function kullaniciyiOku(): KullaniciBilgisi | null {
  if (typeof window === "undefined") return null;
  try {
    const ham = localStorage.getItem(STORAGE_KEY);
    if (!ham) return null;
    return JSON.parse(ham) as KullaniciBilgisi;
  } catch {
    return null;
  }
}

/** Kullanıcı bilgisini localStorage'a yazar */
export function kullaniciyiYaz(kullanici: KullaniciBilgisi): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kullanici));
  // Middleware'in okuyabilmesi için cookie'ye de yaz
  document.cookie = `ogm-token=${kullanici.accessToken}; path=/; max-age=${60 * 60 * 8}; SameSite=Lax`;
  document.cookie = `ogm-rol=${kullanici.rol}; path=/; max-age=${60 * 60 * 8}; SameSite=Lax`;
}

/** Oturumu temizler */
export function oturumuKapat(): void {
  localStorage.removeItem(STORAGE_KEY);
  document.cookie = "ogm-token=; path=/; max-age=0";
  document.cookie = "ogm-rol=; path=/; max-age=0";
}

/** Auth durumunu reaktif olarak izleyen hook */
export function useAuth(): AuthState {
  const [kullanici, setKullanici] = useState<KullaniciBilgisi | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    setKullanici(kullaniciyiOku());
    setYukleniyor(false);

    // Başka sekmede oturum açılırsa/kapanırsa güncelle
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setKullanici(kullaniciyiOku());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { kullanici, yukleniyor };
}
