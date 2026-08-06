// src/middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Resepsiyon login sayfasına giriş yapmış biri gitmeye çalışırsa panele yönlendir
  if (pathname === "/resepsiyon/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/oda-yonetimi", req.nextUrl));
    }
    return NextResponse.next();
  }

  // Resepsiyon Paneli rotaları koruması
  const protectedPaths = [
    "/oda-yonetimi",
    "/bekleyen-talepler",
    "/rezervasyon-yonetimi",
    "/kullanici-yonetimi",
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
    "/resepsiyon/login",
  ],
};
