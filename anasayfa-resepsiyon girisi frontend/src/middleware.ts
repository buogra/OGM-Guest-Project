// src/middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Resepsiyon login sayfasına giriş yapmış biri gitmeye çalışırsa panele yönlendirme
  // iptal edildi. Böylece herkes her zaman login sayfasını görebilir.

  // Resepsiyon Paneli rotaları koruması
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
    // İleride rol bazlı kontrol de yapılabilir: if (req.auth.user.role !== "ADMIN") ...
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/oda-yonetimi/:path*",
    "/bekleyen-talepler/:path*",
    "/rezervasyon-yonetimi/:path*",
    "/kullanici-yonetimi/:path*",
    "/duyuru-yonetimi/:path*",
    "/resepsiyon/login",
  ],
};
