export const ROLLER = {
  MISAFIR: "MISAFIR",
  PERSONEL: "PERSONEL",
  PERSONEL_YAKINI: "PERSONEL_YAKINI",
  ADMIN: "ADMIN",
} as const;

export type Rol = (typeof ROLLER)[keyof typeof ROLLER];

export const TUM_ROLLER: readonly Rol[] = [
  ROLLER.MISAFIR,
  ROLLER.PERSONEL,
  ROLLER.PERSONEL_YAKINI,
  ROLLER.ADMIN,
];

export const ACIK_ROTALAR: string[] = [
  "/giris",
  "/personel-girisi",
  "/uye-ol",
  "/personel-yakini-dogrulama",
  "/iletisim",
];

export const GIRIS_SAYFALARI: string[] = [
  "/personel-girisi",
  "/uye-ol",
];

export const KORUMALI_ROTALAR: {
  onEk: string;
  roller: readonly Rol[];
  girisSayfasi: string;
}[] = [
  { onEk: "/admin", roller: [ROLLER.ADMIN], girisSayfasi: "/giris" },
  { onEk: "/misafir", roller: [ROLLER.MISAFIR, ROLLER.PERSONEL, ROLLER.PERSONEL_YAKINI], girisSayfasi: "/giris" },
  { onEk: "/personel", roller: [ROLLER.PERSONEL], girisSayfasi: "/personel-girisi" },
  { onEk: "/personel-yakini", roller: [ROLLER.PERSONEL_YAKINI], girisSayfasi: "/personel-yakini-dogrulama" },
];

export function rotaKuraliBul(yol: string) {
  if (ACIK_ROTALAR.includes(yol)) return null;

  return (
    KORUMALI_ROTALAR.find(
      (k) => yol === k.onEk || yol.startsWith(`${k.onEk}/`),
    ) ?? null
  );
}

export function rolVarsayilanRotasi(rol: Rol): string {
  return rol === ROLLER.ADMIN ? "/admin" : "/misafir/dashboard";
}

const GUVENLI_YOL_TEMELI = "http://localhost:3000";

export function guvenliYol(yol?: string | null): string | null {
  if (!yol) return null;
  if (!yol.startsWith("/")) return null;

  let cozumlenen: URL;
  try {
    cozumlenen = new URL(yol, GUVENLI_YOL_TEMELI);
  } catch {
    return null;
  }

  if (cozumlenen.origin !== GUVENLI_YOL_TEMELI) return null;

  const temiz = cozumlenen.pathname + cozumlenen.search + cozumlenen.hash;

  if (!temiz.startsWith("/")) return null;
  if (temiz.startsWith("//")) return null;

  return temiz;
}
