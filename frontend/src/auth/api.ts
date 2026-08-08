import { ROLLER, type Rol } from "./roller";

const API = process.env.SPRING_API_URL;

const MOCK =
  process.env.AUTH_DEV_MOCK === "true" && process.env.NODE_ENV !== "production";

export type Kullanici = {
  id: string;
  eposta: string;
  adSoyad: string;
  rol: Rol;
  accessToken: string;
  refreshToken: string;
};

export type IslemSonucu = { ok: true } | { ok: false; mesaj: string };

/* ---------------------------------------------------------------- GIRIS */

export async function girisYap(
  eposta: string,
  sifre: string,
): Promise<Kullanici | null> {
  if (MOCK) return mockGiris(eposta, sifre);

  throw new Error(
    "girisYap: Spring endpoint'i bagli degil. Gelistirme icin .env.local'de AUTH_DEV_MOCK=true kullan.",
  );
}

/* ---------------------------------------------------------------- KAYIT */

export async function kayitOl(veri: {
  ad: string;
  soyad: string;
  eposta: string;
  sifre: string;
}): Promise<IslemSonucu> {
  if (MOCK) {
    console.log("[MOCK] kayit istegi:", { ...veri, sifre: "***" });
    return { ok: true };
  }

  return { ok: false, mesaj: "Kayit servisi henuz bagli degil." };
}

/* ------------------------------------------------------ SIFRE SIFIRLAMA */

export async function sifreSifirlamaIstegi(
  eposta: string,
): Promise<IslemSonucu> {
  if (MOCK) {
    console.log("[MOCK] sifre sifirlama istegi:", eposta);
    return { ok: true };
  }

  return { ok: false, mesaj: "Sifre sifirlama servisi henuz bagli degil." };
}

/* ------------------------------------------------------------- DEV MOCK */

const MOCK_KULLANICILAR = [
  { eposta: "admin@ogm.gov.tr", sifre: "Ogm!Admin.2026", adSoyad: "Sistem Yöneticisi", rol: ROLLER.ADMIN },
  { eposta: "personel@ogm.gov.tr", sifre: "Ogm!Personel.2026", adSoyad: "OGM Personeli", rol: ROLLER.PERSONEL },
  { eposta: "misafir@ogm.gov.tr", sifre: "Ogm!Misafir.2026", adSoyad: "Misafir Kullanıcı", rol: ROLLER.MISAFIR },
];

export function devGirisBilgisi(
  rol: Rol,
): { eposta: string; sifre: string } | null {
  if (!MOCK) return null;

  const k = MOCK_KULLANICILAR.find((m) => m.rol === rol);
  return k ? { eposta: k.eposta, sifre: k.sifre } : null;
}

function mockGiris(eposta: string, sifre: string): Kullanici | null {
  const k = MOCK_KULLANICILAR.find(
    (m) => m.eposta === eposta.trim().toLowerCase() && m.sifre === sifre,
  );
  if (!k) return null;

  return {
    id: `mock-${k.rol}`,
    eposta: k.eposta,
    adSoyad: k.adSoyad,
    rol: k.rol,
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  };
}
