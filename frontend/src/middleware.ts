import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  GIRIS_SAYFALARI,
  rolVarsayilanRotasi,
  rotaKuraliBul,
} from "@/auth/roller";
import type { Rol } from "@/auth/roller";

export default auth((req) => {
  // ----------------------------------------------------
  // 1. RESEPSİYON NEXTAUTH KORUMASI (Mevcut Mantık)
  // ----------------------------------------------------
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    "/oda-yonetimi",
    "/bekleyen-talepler",
    "/rezervasyon-yonetimi",
    "/kullanici-yonetimi",
    "/duyuru-yonetimi",
  ];

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/resepsiyon/login", req.nextUrl));
    }
  }

  // ----------------------------------------------------
  // 2. MİSAFİR & PERSONEL COOKIE KORUMASI (Yeni Mantık)
  // ----------------------------------------------------
  const yol = pathname;
  const kural = rotaKuraliBul(yol);

  // Cookie'den token ve rolü oku
  const token = req.cookies.get("ogm-token")?.value ?? null;
  const rol = (req.cookies.get("ogm-rol")?.value ?? null) as Rol | null;
  const girisYapildiClient = !!token && !!rol;

  // Korumalı rota mı?
  if (kural) {
    // Giriş yapılmamışsa → giriş sayfasına yönlendir
    if (!girisYapildiClient || !rol) {
      const hedef = new URL(kural.girisSayfasi, req.url);
      hedef.searchParams.set("callbackUrl", yol);
      return NextResponse.redirect(hedef);
    }

    // Rolü yetersizse → kendi varsayılan sayfasına yönlendir
    const rolDegeri: Rol = rol;
    if (!(kural.roller as readonly string[]).includes(rolDegeri)) {
      const hedef = new URL(rolVarsayilanRotasi(rolDegeri), req.url);
      return NextResponse.redirect(hedef);
    }
  }

  // Giriş yapmış kullanıcı public giriş sayfasına gitmeye çalışıyorsa → dashboard'a yönlendir
  if (GIRIS_SAYFALARI.includes(yol) && girisYapildiClient && rol) {
    const hedef = new URL(rolVarsayilanRotasi(rol), req.url);
    return NextResponse.redirect(hedef);
  }

  return NextResponse.next();
});

export const config = {
  // Tüm sayfalarda çalışması için genel matcher kullanıyoruz.
  // api, _next (static dosyalar), ikonlar vb. hariç tutulur.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
