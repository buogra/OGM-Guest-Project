import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // İsteğe bağlı olarak giriş sayfasına her zaman erişilebilmesi için
  // redirect kodunu sildim. Artık login'e giden herkes login sayfasını görecek.

  const protectedPaths = [
    "/resepsiyon/oda-yonetimi",
    "/resepsiyon/bekleyen-talepler",
    "/resepsiyon/rezervasyon-yonetimi",
    "/resepsiyon/kullanici-yonetimi",
    "/resepsiyon/duyuru-yonetimi",
  ];

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/resepsiyon/login", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/resepsiyon/oda-yonetimi/:path*",
    "/resepsiyon/bekleyen-talepler/:path*",
    "/resepsiyon/rezervasyon-yonetimi/:path*",
    "/resepsiyon/kullanici-yonetimi/:path*",
    "/resepsiyon/duyuru-yonetimi/:path*",
    "/resepsiyon/login",
  ],
};
